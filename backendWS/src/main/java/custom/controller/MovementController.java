package custom.controller;

import custom.model.*;
import custom.service.LossService;
import custom.service.MovementDetailsService;
import custom.springutils.controller.CrudController;
import custom.service.MovementService;
import custom.springutils.util.ControllerUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/movements")
public class MovementController extends CrudController<Movement, MovementService, Object> {

    @Autowired
    private MovementDetailsService mouvementDetailService;
    @Autowired
    private LossService lossService;

    public MovementController(MovementService service) {
        super(service);
    }

    @PostMapping("")
    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<?> create(@RequestBody Movement obj) throws Exception {
        Movement created = service.create(obj);
        List<MovementDetails> details = obj.getMovementDetails();
        for (MovementDetails detail : details) {
            Movement mv = new Movement();
            mv.setId(created.getId());
            detail.setMovement(mv);
            mouvementDetailService.create(detail);
        }
        return ControllerUtil.returnSuccess(obj, HttpStatus.OK);
    }

    @PostMapping("/receive-and-send-back")
    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<?> receiveAndSendBack(@RequestBody ReceiptSendBack obj) throws Exception {
        Movement current = service.findById(obj.getMovementId());
        Movement receivedObj = obj.getFinalObjReceived();
        Movement sendBackObj = obj.getFinalObjSendBack();
        Store receiver = new Store();
        receiver.setId(current.getSender().getId());
        sendBackObj.setReceiver(receiver);
        Movement received = service.create(receivedObj);
        Movement sendBack = service.create(sendBackObj);
        List<MovementDetails> detailsReceived = received.getMovementDetails();
        List<MovementDetails> detailsSendBack = sendBack.getMovementDetails();
//        save loss
        saveLoss(current.getMovementDetails(), detailsReceived, sendBackObj);
        for (MovementDetails detail : detailsReceived) {
            Movement mv = new Movement();
            mv.setId(received.getId());
            detail.setMovement(mv);
            mouvementDetailService.create(detail);
        }
        for (MovementDetails detail : detailsSendBack) {
            Movement mv = new Movement();
            mv.setId(sendBack.getId());
            detail.setMovement(mv);
            mouvementDetailService.create(detail);
        }
        current.setType(6);
        service.update(current);
        return ControllerUtil.returnSuccess(obj, HttpStatus.OK);
    }

    private void saveLoss(List<MovementDetails> movementDetails, List<MovementDetails> detailsReceived, Movement sendBackObj) throws Exception {
        int i = 0;
        for (MovementDetails detail : movementDetails) {
            i = 0;
            for (MovementDetails detailReceived : detailsReceived) {
                if (detail.getLaptop().getId().equals(detailReceived.getLaptop().getId())) {
                    double quantityLost = detail.getQuantity() - (detailReceived.getQuantity() + (sendBackObj!=null? sendBackObj.getMovementDetails().get(i).getQuantity():0));
                    Loss loss = new Loss();
                    Laptop laptop = new Laptop();
                    laptop.setId(detail.getLaptop().getId());
                    loss.setLaptop(laptop);
                    loss.setQuantity(quantityLost);
                    loss.setLossDate(new Timestamp(System.currentTimeMillis()));
                    if (quantityLost > 0) {
                        lossService.create(loss);
                    }
                }
                i++;
            }
        }
    }

    @PostMapping("/confirm-receive")
    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<?> confirmReceive(@RequestBody Movement obj) throws Exception {
        Movement former = service.findById(obj.getId());
        former.setType(7);
        obj.setSender(former.getSender());
        service.update(former);
        obj.setId(null);
        Movement current = service.create(obj);
        List<MovementDetails> detail = obj.getMovementDetails();
//        save loss
        saveLoss(former.getMovementDetails(), detail, null);
        for (MovementDetails d : detail) {
            Movement mv = new Movement();
            mv.setId(current.getId());
            d.setMovement(mv);
            mouvementDetailService.create(d);
        }
        return ControllerUtil.returnSuccess(obj, HttpStatus.OK);
    }

}
