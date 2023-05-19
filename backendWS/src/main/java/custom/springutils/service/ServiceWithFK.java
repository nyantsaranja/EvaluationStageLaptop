package custom.springutils.service;


import custom.springutils.util.ListResponse;

public interface ServiceWithFK<E, FK> extends Service<E> {
    String getFkName();
    ListResponse search (Object filter, Long fkId, Integer page) throws Exception;
}
