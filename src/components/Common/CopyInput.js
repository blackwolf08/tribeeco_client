import React, { useRef, useState } from "react";
import { BASE_URL } from "../../constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CopyInput(props) {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }

  return (
    <form>
      <div className="input-group">
        <input
          className="form-control"
          ref={textAreaRef}
          value={`${BASE_URL}${props.inputValue}`}
        />
        <div class="input-group-append">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={copyToClipboard}
          >
            <FontAwesomeIcon icon="copy" />
          </button>
        </div>
      </div>
      <p className="text-success mt-2">{copySuccess}</p>
    </form>
  );
}
