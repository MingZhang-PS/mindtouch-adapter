import { XmlDocument } from 'xmldoc';
import parser = require('xml2json');

export class XML2JsonHelper {
    transform(xml: XmlDocument): any {
        const jsonString = parser.toJson(xml.toString());
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    }
}
