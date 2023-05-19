package custom.model.filter;

import custom.model.Store;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VSalesPerSalepointsFilter {
    private Store sender;
    private String ilike_reference;
    private Double min_total;
    private Double max_total;
}
