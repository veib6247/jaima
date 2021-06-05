/**
 * main vue instance
 */
const app = Vue.createApp({
  data() {
    return {
      searchBy: "title",
      query: "", // actual query of the user
      resultManga: "",
      placeholder: "e.g. Ijiranaide, Nagatoro-san", // because, why not?
      isButtonLoading: false,

      // when set to true, toggles css of some element to use "is-danger" class
      displayQueryError: false,
      errorMsg: "Search query cannot be empty!",

      // toggles css for which tab is active
      activePages: {
        search: true,
        about: false,
      },
    };
  },

  watch: {
    /**
     * runs this function to update the placeholder depending on the search mode
     * function name must match the name if the data being watched
     */
    searchBy(selectDropDownValue) {
      this.changePlaceholderValue(selectDropDownValue);
    },
  },

  /**
   * all app methods here
   */
  methods: {
    /**
     * receives the ID of the anchor tag that was clicked
     * then use switch/case for the logic
     * @param {String} eventTargetID
     */
    setActivePage(event) {
      switch (event.target.id) {
        case "tabSearch":
          this.manageState(true, false);
          break;
        case "tabAbout":
          this.manageState(false, true);
          break;
        default:
          console.error("Target ID does not have an attached logic.");
          break;
      }
    },

    /**
     * a minimal(*shitty) state manager/changer for the pages
     * @param {Boolean} search
     * @param {Boolean} about
     */
    manageState(search, about) {
      this.activePages.search = search;
      this.activePages.about = about;
      // wooooooooooooooooooooooooooooooooooooooo!
    },

    /**
     * value of the selected drop down item
     * @param {String} selectDropDownValue
     */
    changePlaceholderValue(selectDropDownValue) {
      if (selectDropDownValue == "title") {
        this.placeholder = "e.g. Ijiranaide, Nagatoro-san";
      } else {
        this.placeholder = "e.g. Nanashi";
      }
    },

    executeSearch() {
      /**
       * validate user input before executing the correct script
       */
      if (this.query == "") {
        this.errorMsg = "Search query cannot be empty!";
        this.displayQueryError = true;
      } else {
        // reset the input state to default
        this.displayQueryError = false;
        // check which search mode is used then switch to the right function
        switch (this.searchBy) {
          case "title":
            this.searchByTitle(this.query);
            break;
          case "name":
            this.searchByArtist(this.query);
            break;
          // will be adding more search options in the future so will leave this like this for now
          default:
            break;
        }
      }
    },

    /**
     * receives the title of the manga
     * @param {String} query
     */
    async searchByTitle(query) {
      try {
        // start button loading animation by changing button state
        this.isButtonLoading = true;
        /**
         * This is only temporary
         * will need to create serverless functions to do the API calls to mangadex
         */
        const response = await fetch(
          `https://api.mangadex.org/manga?title=${query}`
        );
        // parse response into json
        const data = await response.json();
        // validate if search query yeilded any results
        if (data.results.length) {
          // store result in variable
          this.resultManga = data.results;
        } else {
          this.displayQueryError = true;
          this.errorMsg = "Search query did not return any results.";
        }
      } catch (error) {
        console.error(error);
      } finally {
        // reset button state to stop animation
        this.isButtonLoading = false;
      }
    },

    /**
     * receives the name of the artist
     * @param {String} name
     */
    searchByArtist(name) {
      console.log(`Artist name: ${name}`);
    },
  },
});

// mount the instance into the html
const vm = app.mount("#app");
