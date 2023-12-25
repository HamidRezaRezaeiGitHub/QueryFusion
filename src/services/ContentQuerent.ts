import { ContentType } from "../types/ContentType";
import { QueryResponse } from "../types/QueryResponse";
import { IContentQuerent } from "./IContentQuerent";
import { JsonQuerent } from "./json/JsonQuerent";
import { XmlQuerent } from "./xml/XmlQuerent";

class ContentQuerent {
  private jsonQuerent: IContentQuerent = new JsonQuerent();
  private xmlQuerent: IContentQuerent = new XmlQuerent();

  public queryContent(
    contentType: ContentType,
    content: string,
    queries: string[]
  ): QueryResponse[] {
    switch (contentType) {
      case ContentType.JSON:
        return this.jsonQuerent.queryContent(content, queries);
      case ContentType.XML:
        return this.xmlQuerent.queryContent(content, queries);
      default:
        throw new Error(
          "Unsupported content type for querying: " + contentType
        );
    }
  }
}

export default new ContentQuerent();
