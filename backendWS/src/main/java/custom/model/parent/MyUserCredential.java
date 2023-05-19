package custom.model.parent;

import custom.springutils.LoginEntity;
import custom.springutils.model.HasId;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.codec.digest.DigestUtils;

import java.sql.Date;

@MappedSuperclass
@Getter
@Setter
public class MyUserCredential extends HasId implements LoginEntity {
    private String name;
    private String email;
    private String password;
    private Date birthdate;

    public void setPassword(String password) {
        this.password = DigestUtils.sha1Hex(password);
    }

}
