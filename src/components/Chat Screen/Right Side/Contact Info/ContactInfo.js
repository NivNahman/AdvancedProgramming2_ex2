import "./ContactInfo.css"
import defpic from "./../../../../default_picture.jpeg"
function ContactInfo({ contact }) {
    return (
        <table className="contactInfo">
            <tbody>
            <tr>
                <th className="his-image">
                    <img className ="img rounded-circle"
                        src={defpic}
                        alt="img"
                    />
                </th>
                <th className="contact-name">
                    {contact.name}
                </th>
                <th className="rate">
                Rate Us
                    <a href="http://localhost:7215/Rates/Index"> Here</a>
                </th>
            </tr>
            </tbody>
        </table>

    );
}
export default ContactInfo