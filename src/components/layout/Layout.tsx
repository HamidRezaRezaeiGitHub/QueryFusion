import { ContentType } from "../../model/content/ContentType";
import { EditorFocus } from "../../model/editor/EditorFocus";
import { ContentSpecificValues } from "../../model/content/ContentSpecificValues";
import { DefaultContentSpecificValues } from "../../model/content/DefaultContentSpecificValues";
import ContentPanel from "../content/ContentPanel";
import "../styles/debug.css";
import "../styles/Layout.css";
import { useState } from "react";
import QueryResultPanel from "./QueryResultPanel";
import { ValidationResponse } from "../../model/validation/ValidationResponse";

interface LayoutProps {
  contentType: ContentType;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const Layout = ({
  contentType,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: LayoutProps) => {
  const [contentSpecificMap, setContentSpecificMap] = useState<
    Map<ContentType, ContentSpecificValues>
  >(new Map());
  const [validationResponse, setValidationResponse] =
    useState<ValidationResponse>({
      isValid: false,
      validationError: "",
    });

  const handleEditorChange = (
    contentType: ContentType,
    key: keyof ContentSpecificValues,
    newValue: string
  ) => {
    const updatedContentSpecificMap = new Map(contentSpecificMap);
    const currentContentSpecificValues =
      updatedContentSpecificMap.get(contentType) ||
      new DefaultContentSpecificValues();

    currentContentSpecificValues[key] = newValue;

    updatedContentSpecificMap.set(contentType, currentContentSpecificValues);
    setContentSpecificMap(updatedContentSpecificMap);
  };

  const handleContentChange = (
    contentType: ContentType,
    newContent: string
  ) => {
    handleEditorChange(contentType, "content", newContent);
  };

  const handleQueryChange = (contentType: ContentType, newQuery: string) => {
    handleEditorChange(contentType, "query", newQuery);
  };

  const handleResultChange = (contentType: ContentType, newResult: string) => {
    handleEditorChange(contentType, "result", newResult);
  };

  const getContent = (contentType: ContentType): string => {
    return contentSpecificMap.get(contentType)?.content || "";
  };

  const getQuery = (contentType: ContentType): string => {
    return contentSpecificMap.get(contentType)?.query || "";
  };

  const getResult = (contentType: ContentType): string => {
    return contentSpecificMap.get(contentType)?.result || "";
  };

  return (
    <div className="layout">
      <div className="layout__content-panel">
        <ContentPanel
          contentType={contentType}
          getContent={getContent}
          onContentChange={handleContentChange}
          setValidationResponse={setValidationResponse}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
      <div className="layout__query-result-panel">
        <QueryResultPanel
          contentType={contentType}
          getContent={getContent}
          getQuery={getQuery}
          getResult={getResult}
          onQueryChange={handleQueryChange}
          onResultChange={handleResultChange}
          validationResponse={validationResponse}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
    </div>
  );
};

export default Layout;