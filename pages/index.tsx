import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useCallback } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Gapcursor from "@tiptap/extension-gapcursor";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Text,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      OrderedList,
      ListItem,
      BulletList,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      Blockquote,
      History,
      Link,
      Superscript,
      Subscript,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `
   
      <ol>
        <li>A list item</li>
        <li>And another one</li>
      </ol>

      <ol start="5">
        <li>This item starts at 5</li>
        <li>And another one</li>
      </ol>

      <h2>Heading</h2>
      <p>first paragraph</p>
    `,
  });

  const tiptapstate = editor?.getJSON();
  console.log(tiptapstate);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <h1 className="text-5xl font-bold mt-10 text-center">Tiptap Editor</h1>
      <div className="w-full p-10 flex justify-around">
        <div className="w-1/2 p-10">
          {/* Undo/Redo */}
          <h1 className="text-xl font-bold mb-4">Undo/Redo</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="bg-black text-white px-3 py-1 rounded"
            >
              Undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="bg-black text-white px-3 py-1 rounded"
            >
              Redo
            </button>
          </div>
          <EditorContent editor={editor} className="border p-5 mt-5" />
        </div>
        <div className="w-1/2 p-10">
          {/* Listing  */}
          <h1 className="text-xl font-bold mb-4">Ordered/Unorderd List</h1>
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-4 py-2 bg-black text-white ${
                editor.isActive("bulletList") ? "is-active" : ""
              }`}
            >
              toggleBulletList
            </button>
            <button
              onClick={() =>
                editor.chain().focus().splitListItem("listItem").run()
              }
              disabled={!editor.can().splitListItem("listItem")}
              className={`px-4 py-2 bg-black text-white ${
                !editor.can().splitListItem("listItem")
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              splitListItem
            </button>
            <button
              onClick={() =>
                editor.chain().focus().sinkListItem("listItem").run()
              }
              disabled={!editor.can().sinkListItem("listItem")}
              className={`px-4 py-2 bg-black text-white ${
                !editor.can().sinkListItem("listItem")
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              sinkListItem
            </button>
            <button
              onClick={() =>
                editor.chain().focus().liftListItem("listItem").run()
              }
              disabled={!editor.can().liftListItem("listItem")}
              className={`px-4 py-2 bg-black text-white ${
                !editor.can().liftListItem("listItem")
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              liftListItem
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-4 py-2 bg-black text-white ${
                editor.isActive("orderedList") ? "is-active" : ""
              }`}
            >
              Toggle Ordered List
            </button>
          </div>
          {/* Text color */}
          <h1 className="text-xl font-bold mb-4">Text color</h1>

          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => editor.chain().focus().setColor("#958DF1").run()}
              className={`px-4 py-2 bg-purple-500 text-white ${
                editor.isActive("textStyle", { color: "#958DF1" })
                  ? "is-active"
                  : ""
              }`}
              data-testid="setPurple"
            >
              Purple
            </button>
            <button
              onClick={() => editor.chain().focus().setColor("#F98181").run()}
              className={`px-4 py-2 bg-red-500 text-white ${
                editor.isActive("textStyle", { color: "#F98181" })
                  ? "is-active"
                  : ""
              }`}
              data-testid="setRed"
            >
              Red
            </button>
            <button
              onClick={() => editor.chain().focus().setColor("#FBBC88").run()}
              className={`px-4 py-2 bg-orange-500 text-white ${
                editor.isActive("textStyle", { color: "#FBBC88" })
                  ? "is-active"
                  : ""
              }`}
              data-testid="setOrange"
            >
              Orange
            </button>
            <button
              onClick={() => editor.chain().focus().setColor("#FAF594").run()}
              className={`px-4 py-2 bg-yellow-500 text-white ${
                editor.isActive("textStyle", { color: "#FAF594" })
                  ? "is-active"
                  : ""
              }`}
              data-testid="setYellow"
            >
              Yellow
            </button>
            <button
              onClick={() => editor.chain().focus().setColor("#70CFF8").run()}
              className={`px-4 py-2 bg-blue-500 text-white ${
                editor.isActive("textStyle", { color: "#70CFF8" })
                  ? "is-active"
                  : ""
              }`}
              data-testid="setBlue"
            >
              Blue
            </button>
            <button
              onClick={() => editor.chain().focus().setColor("#94FADB").run()}
              className={`px-4 py-2 bg-teal-500 text-white ${
                editor.isActive("textStyle", { color: "#94FADB" })
                  ? "is-active"
                  : ""
              }`}
              data-testid="setTeal"
            >
              Teal
            </button>
            <button
              onClick={() => editor.chain().focus().setColor("#B9F18D").run()}
              className={`px-4 py-2 bg-green-500 text-white ${
                editor.isActive("textStyle", { color: "#B9F18D" })
                  ? "is-active"
                  : ""
              }`}
              data-testid="setGreen"
            >
              Green
            </button>
            <button
              onClick={() => editor.chain().focus().unsetColor().run()}
              className="px-4 py-2 bg-gray-500 text-white"
              data-testid="unsetColor"
            >
              UnsetColor
            </button>
          </div>
          {/* Text highlight */}
          <h1 className="text-xl font-bold mb-4">Highlight Text</h1>
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`px-4 py-2 bg-gray-300 ${
                editor.isActive("highlight") ? "is-active" : ""
              }`}
            >
              Toggle Highlight
            </button>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: "#ffc078" })
                  .run()
              }
              className={`px-4 py-2 bg-orange-500 text-white ${
                editor.isActive("highlight", { color: "#ffc078" })
                  ? "is-active"
                  : ""
              }`}
            >
              Orange
            </button>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: "#8ce99a" })
                  .run()
              }
              className={`px-4 py-2 bg-green-500 text-white ${
                editor.isActive("highlight", { color: "#8ce99a" })
                  ? "is-active"
                  : ""
              }`}
            >
              Green
            </button>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: "#74c0fc" })
                  .run()
              }
              className={`px-4 py-2 bg-blue-500 text-white ${
                editor.isActive("highlight", { color: "#74c0fc" })
                  ? "is-active"
                  : ""
              }`}
            >
              Blue
            </button>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: "#b197fc" })
                  .run()
              }
              className={`px-4 py-2 bg-purple-500 text-white ${
                editor.isActive("highlight", { color: "#b197fc" })
                  ? "is-active"
                  : ""
              }`}
            >
              Purple
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHighlight({ color: "red" }).run()
              }
              className={`px-4 py-2 bg-red-500 text-white ${
                editor.isActive("highlight", { color: "red" })
                  ? "is-active"
                  : ""
              }`}
            >
              Red
            </button>
            <button
              onClick={() => editor.chain().focus().unsetHighlight().run()}
              className={`px-4 py-2 bg-gray-500 text-white ${
                !editor.isActive("highlight") ? "cursor-not-allowed" : ""
              }`}
              disabled={!editor.isActive("highlight")}
            >
              Unset Highlight
            </button>
          </div>
          {/* Text Fromating */}
          <h1 className="text-xl font-bold mb-4">Text Formating</h1>
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-4 py-2 text-${
                editor.isActive("bold") ? "white" : "black"
              } ${
                editor.isActive("bold")
                  ? "bg-black"
                  : "bg-white border-black border-2"
              } rounded`}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-4 py-2 text-${
                editor.isActive("italic") ? "white" : "black"
              } ${
                editor.isActive("italic")
                  ? "bg-black"
                  : "bg-white border-black border-2"
              } rounded`}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-4 py-2 text-${
                editor.isActive("underline") ? "white" : "black"
              } ${
                editor.isActive("underline")
                  ? "bg-black"
                  : "bg-white border-black border-2"
              } rounded`}
            >
              Underline
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`px-4 py-2 text-${
                editor.isActive("strike") ? "white" : "black"
              } ${
                editor.isActive("strike")
                  ? "bg-black"
                  : "bg-white border-black border-2"
              } rounded`}
            >
              Strike
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`px-4 py-2 text-${
                editor.isActive("code") ? "white" : "black"
              } ${
                editor.isActive("code")
                  ? "bg-black"
                  : "bg-white border-black border-2"
              } rounded`}
            >
              Code
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`px-4 py-2 text-${
                editor.isActive("blockquote") ? "white" : "black"
              } ${
                editor.isActive("blockquote")
                  ? "bg-black"
                  : "bg-white border-black border-2"
              } rounded`}
            >
              Blockquote
            </button>
          </div>
          <div className=" flex items-center">
            {/* Text alignment */}
            <div>
              <h1 className="text-xl font-bold mb-4">Text Alignment</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  className={`${
                    editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                  } bg-black text-white px-3 py-1 rounded`}
                >
                  left
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className={`${
                    editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                  } bg-black text-white px-3 py-1 rounded`}
                >
                  center
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className={`${
                    editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                  } bg-black text-white px-3 py-1 rounded`}
                >
                  right
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                  }
                  className={`${
                    editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
                  } bg-black text-white px-3 py-1 rounded`}
                >
                  justify
                </button>
              </div>
            </div>
            {/* Heading */}
            <div className="ml-10">
              <h1 className="text-xl font-bold mb-4">Heading</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`px-4 py-2 text-${
                    editor.isActive("heading", { level: 1 }) ? "white" : "black"
                  } ${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-black"
                      : "bg-white border-black border-2"
                  } rounded`}
                >
                  H1
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`px-4 py-2 text-${
                    editor.isActive("heading", { level: 2 }) ? "white" : "black"
                  } ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-black"
                      : "bg-white border-black border-2"
                  } rounded`}
                >
                  H2
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={`px-4 py-2 text-${
                    editor.isActive("heading", { level: 3 }) ? "white" : "black"
                  } ${
                    editor.isActive("heading", { level: 3 })
                      ? "bg-black"
                      : "bg-white border-black border-2"
                  } rounded`}
                >
                  H3
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-5">
            {/* Link */}
            <div>
              <h1 className="text-xl font-bold mb-4">Link</h1>
              <div className="flex space-x-4">
                <button
                  onClick={setLink}
                  className={`${
                    editor.isActive("link")
                      ? "bg-black text-white"
                      : "border border-black"
                  } px-3 py-1 rounded`}
                >
                  setLink
                </button>
                <button
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  disabled={!editor.isActive("link")}
                  className={`${
                    !editor.isActive("link")
                      ? "bg-black text-white"
                      : "border border-black"
                  } px-3 py-1 rounded`}
                >
                  unsetLink
                </button>
              </div>
            </div>
            {/* Superscript/Subscript */}
            <div className="ml-10">
              <h1 className="text-xl font-bold mb-4">Superscript/Subscript</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() =>
                    editor.chain().focus().toggleSuperscript().run()
                  }
                  className={`${
                    editor.isActive("superscript")
                      ? "bg-black text-white"
                      : "border border-black"
                  } px-3 py-1 rounded`}
                >
                  Superscript
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleSubscript().run()}
                  className={`${
                    editor.isActive("subscript")
                      ? "bg-black text-white"
                      : "border border-black"
                  } px-3 py-1 rounded`}
                >
                  Subscript
                </button>
              </div>
            </div>
          </div>
          {/* Table designing */}
          <h1 className="text-xl font-bold mb-4 mt-5">Table Design</h1>
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              className="border border-black p-2 rounded"
            >
              insertTable
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              className="border border-black p-2 rounded"
            >
              addColumnBefore
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="border border-black p-2 rounded"
            >
              addColumnAfter
            </button>
            <button
              onClick={() => editor.chain().focus().deleteColumn().run()}
              className="border border-black p-2 rounded"
            >
              deleteColumn
            </button>
            <button
              onClick={() => editor.chain().focus().addRowBefore().run()}
              className="border border-black p-2 rounded"
            >
              addRowBefore
            </button>
            <button
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className="border border-black p-2 rounded"
            >
              addRowAfter
            </button>
            <button
              onClick={() => editor.chain().focus().deleteRow().run()}
              className="border border-black p-2 rounded"
            >
              deleteRow
            </button>
            <button
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="border border-black p-2 rounded"
            >
              deleteTable
            </button>
            <button
              onClick={() => editor.chain().focus().mergeCells().run()}
              className="border border-black p-2 rounded"
            >
              mergeCells
            </button>
            <button
              onClick={() => editor.chain().focus().splitCell().run()}
              className="border border-black p-2 rounded"
            >
              splitCell
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
              className="border border-black p-2 rounded"
            >
              toggleHeaderColumn
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
              className="border border-black p-2 rounded"
            >
              toggleHeaderRow
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
              className="border border-black p-2 rounded"
            >
              toggleHeaderCell
            </button>
            <button
              onClick={() => editor.chain().focus().mergeOrSplit().run()}
              className="border border-black p-2 rounded"
            >
              mergeOrSplit
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setCellAttribute("colspan", 2).run()
              }
              className="border border-black p-2 rounded"
            >
              setCellAttribute
            </button>
            <button
              onClick={() => editor.chain().focus().fixTables().run()}
              className="border border-black p-2 rounded"
            >
              fixTables
            </button>
            <button
              onClick={() => editor.chain().focus().goToNextCell().run()}
              className="border border-black p-2 rounded"
            >
              goToNextCell
            </button>
            <button
              onClick={() => editor.chain().focus().goToPreviousCell().run()}
              className="border border-black p-2 rounded"
            >
              goToPreviousCell
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TiptapEditor;
