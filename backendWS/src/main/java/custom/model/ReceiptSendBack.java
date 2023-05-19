package custom.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceiptSendBack {
    private Movement finalObjReceived;
    private Movement finalObjSendBack;
    private Long movementId;
}
