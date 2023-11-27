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
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import FileHandler from "@tiptap-pro/extension-file-handler";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import "katex/dist/katex.min.css";
import ColorPicker from "../components/Colorpicker";

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
      Image,
      Dropcursor,
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
      Mathematics,
    ],
    content: `
   
     <p></p>
     <p></p>
     
    `,
  });

  const tiptapstate = editor?.getJSON();
  console.log(tiptapstate);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

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

  const [textColor, setTextColor] = React.useState("#000");
  const [highlightColor, setHighlightColor] = React.useState("#000");

  const changeTextColorHandlerHandler = (value: string) => {
    setTextColor(value);
    editor?.chain().focus().setColor(textColor).run();
  };

  const changeHighlightColorHandler = (value: string) => {
    setHighlightColor(value);
    editor?.chain().focus().toggleHighlight({ color: highlightColor }).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <h1 className="text-5xl font-bold mt-10 text-center">Tiptap Editor</h1>
      <div className="w-full p-10">
        <div className=" p-10 flex justify-center">
          <div className="editor">
            <div className="editor__header">
              {/* Bold */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                B
              </button>
              {/* Italic */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                I
              </button>
              {/* Underline */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                U
              </button>
              {/* Strike */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                St
              </button>
              <button className="divider"></button>
              {/* Code */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                Cd
              </button>
              {/* Superscript */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
              >
                Spt
              </button>
              {/* Subscript */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
              >
                Sbt
              </button>
              <button className="divider"></button>
              {/* Link */}
              <button className="menu-item" onClick={setLink}>
                Lk
              </button>
              {/* Highlight color */}
              <ColorPicker
                color={highlightColor}
                onChange={changeHighlightColorHandler}
              >
                <div className={`menu-item gap-1`}>Htl</div>
              </ColorPicker>
              {/* text color */}
              <ColorPicker
                color={textColor}
                onChange={changeTextColorHandlerHandler}
              >
                <div className={`menu-item gap-1`}>Tcr</div>
              </ColorPicker>

              <button className="divider"></button>
              <button
                className="menu-item"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                H1
              </button>
              <button
                className="menu-item"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                H2
              </button>
              <button
                className="menu-item"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                H3
              </button>
              <button className="divider"></button>
              {/* Bullet list */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                Bl
              </button>
              {/* Ordered list */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                Ol
              </button>
              {/* BlockQuote */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                Bq
              </button>
              <button className="divider"></button>
              {/* Text alignment */}
              {/* left */}
              <button
                className="menu-item"
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                Tlt
              </button>
              {/* right */}
              <button
                className="menu-item"
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                Trt
              </button>
              {/* center */}
              <button
                className="menu-item"
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                Tct
              </button>
              <button className="divider"></button>
              {/* Table */}
              <button
                className="menu-item"
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 4, cols: 4, withHeaderRow: true })
                    .run()
                }
              >
                Tbl
              </button>
              {/* Image */}
              <button className="menu-item" onClick={addImage}>
                Img
              </button>
              <button className="divider"></button>
              {/* undo */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                Ud
              </button>
              {/* Redo */}
              <button
                className="menu-item"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                Rd
              </button>
            </div>
            <div className="editor__content">
              <EditorContent editor={editor} />
            </div>
            <div className="editor__footer">
              <div className="editor__status">1 User</div>
              <div className="editor__name">
                <button>Jain Paul</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TiptapEditor;
