package custom.service;

import custom.model.Processor;
import custom.repository.ProcessorRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;


@Service
public class ProcessorService extends CrudService<Processor, ProcessorRepo> {

    public ProcessorService(ProcessorRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Processor> getEntityClass() {
        return Processor.class;
    }

}
