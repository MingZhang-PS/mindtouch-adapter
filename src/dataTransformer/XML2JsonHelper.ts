import { XmlDocument } from 'xmldoc';
import parser = require('xml2json');

export class XML2JsonHelper {
    transform(xml: XmlDocument): any {
        const json = parser.toJson(xml.toString());
        return json;
    }
}
