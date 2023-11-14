// RichTextEditor.tsx
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";

interface RichTextEditorProps {
  text: string; // Initial content for the editor
  onTextChange: (text: string) => void; // Function to update content
  placeholder: string;
}
interface Colour {
  value: string;
  name: string;
}
export const MenuBar: React.FC<{ editor: Editor; placeholder: string }> = ({
  editor,
  placeholder,
}) => {
  if (!editor) {
    return null;
  }

  const addBold = () => editor.chain().focus().toggleBold().run();
  const addItalic = () => editor.chain().focus().toggleItalic().run();
  const addStrike = () => editor.chain().focus().toggleStrike().run();
  const addBulletList = () => editor.chain().focus().toggleBulletList().run();
  const setHeading = (level: number) => () => {
    editor
      .chain()
      .focus()
      .toggleHeading({ level: level as any })
      .run();
  };
  const supportedFontFamilies: string[] = ["serif", "monospace", "cursive"];

  const supportedColours: Colour[] = [
    { value: "#0050B3", name: "blue" },
    { value: "#AD4E00", name: "orange" },
    { value: "#391085", name: "purple" },
  ];
  return (
    <div className="btn-toolbar mb-2 mb-md-0" role="toolbar">
      <div className="btn-group mr-2">
        <button
          onClick={addBold}
          className={`btn ${
            editor.isActive("bold") ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          onClick={addItalic}
          className={`btn ${
            editor.isActive("italic") ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          onClick={addStrike}
          className={`btn ${
            editor.isActive("strike") ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button
          onClick={addBulletList}
          className={`btn ${
            editor.isActive("bulletList")
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button
          onClick={setHeading(1)}
          className={`btn btn-sm ${
            editor.isActive("heading", { level: 1 })
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
        >
          H1
        </button>
        <button
          onClick={setHeading(2)}
          className={`btn btn-sm ${
            editor.isActive("heading", { level: 2 })
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
        >
          H2
        </button>
        <button
          onClick={setHeading(3)}
          className={`btn btn-sm ${
            editor.isActive("heading", { level: 3 })
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
        >
          H3
        </button>
        <select
          className="custom-select custom-select-sm"
          onChange={(event) =>
            editor
              ?.chain()
              .focus()
              .setFontFamily(event.target.value || "")
              .run()
          }
          value={editor ? editor.getAttributes("textStyle").fontFamily : ""}
        >
          <option value="" disabled>
            Font
          </option>

          {supportedFontFamilies.map((font, index) => (
            <option key={index} value={font}>
              {font}
            </option>
          ))}
        </select>
        <select
          className="custom-select custom-select-sm"
          onChange={(event) =>
            editor?.chain().focus().setColor(event.target.value).run()
          }
          value={editor ? editor.getAttributes("textStyle").color : ""}
        >
          <option value="">Color</option>
          {supportedColours.map((colour, index) => (
            <option key={index} value={colour.value}>
              {colour.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  text,
  onTextChange,
  placeholder,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Color,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      FontFamily,
    ],
    content: text,
    onUpdate: ({ editor }) => {
      onTextChange(editor.getHTML());
    },
  });

  return (
    <div className="card">
      <div className="card-body">
        {editor && <MenuBar editor={editor} placeholder={placeholder} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
