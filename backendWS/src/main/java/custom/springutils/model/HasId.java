package custom.springutils.model;

import custom.pdfutils.PDFColumn;
import custom.pdfutils.PdfGenerator;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

import static jakarta.persistence.GenerationType.IDENTITY;

@MappedSuperclass
public class HasId extends PdfGenerator {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    protected Long id;

    @PDFColumn(value = "Id",width = 20, order = 0)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
