<template>
  <v-card class="container">
    <v-text-field
      class="title"
      dense
      label="Title"
      outlined
      v-model="title"
    ></v-text-field>
    <quill-editor class="editor" v-model="content" :options="editorOption">
    </quill-editor>
    <div class="buttons">
      <v-btn color="error" large @click="closeEditor">Cancel</v-btn>
      <v-btn color="success" large @click="saveNote" :disabled="!valid"
        >Save</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ align: [] }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
];
export default {
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: toolbarOptions,
        },
      },
      content: "",
      title: "",
    };
  },
  computed: {
    valid: function() {
      return this.title.length > 0 && this.content.length > 0;
    },
  },
  methods: {
    closeEditor: function() {
      this.$emit("close");
    },
    saveNote: function() {
      axios
        .post(
          this.$endpoints.ADDNOTE,
          {
            userId: this.$store.getters.getUserId,
            bookId: this.$route.params.id,
            note: {
              title: this.title,
              content: this.content,
              timestamp: Date.now(),
            },
          },
          {
            withCredentials: true,
          }
        )
        .then(()=>{
          this.$toasted.success("Note Added Successfully")
          this.$emit("addded")
        })
        .catch(()=>this.$toasted.error("An error occured try again"));
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .container {
    padding: 1em;
    .title {
      padding: 1em;
      margin-bottom: -1em;
    }
    .editor {
      padding: 1em;
      margin-bottom: 1em;
    }
    .buttons {
      text-align: center;
      .v-btn {
        margin: 1em;
        width: 9em;
      }
    }
  }
}
@media screen and (max-width: 990px) {
  .container {
    padding: 1em;
    .title {
      padding: 0.5em;
      margin-bottom: -1em;
    }
    .editor {
      padding: 0.5em;
      margin-bottom: 1em;
    }
    .buttons {
      text-align: center;
      .v-btn {
        margin: 0.5em;
        width: 7em;
      }
    }
  }
}
</style>
