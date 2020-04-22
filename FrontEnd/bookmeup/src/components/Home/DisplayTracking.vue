<template>
  <div class="container">
    <v-row class="first_card">
      <v-col cols="12">
        <v-card outlined>
          <div class="title">{{ title }}</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="second_cards">
      <v-col cols="12" lg="6">
        <v-card outlined>
          <div class="label">Remaining Pages</div>
          <div class="value">{{ remain_pages }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card outlined>
          <div class="label">Finish Date</div>
          <div class="value">{{ getDate(data.finish_date) }}</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="graph">
      <v-col cols="12">
        <v-card outlined>
          <div class="text">Reading History</div>
          <v-sparkline
            :labels="labels"
            :value="values"
            :auto-draw="true"
            :show-labels="false"
            label-size="4"
            padding="20"
            line-width="0.2"
            color="black"
          ></v-sparkline>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="botttom_cards">
      <v-col cols="12" lg="6">
        <v-card outlined>
          <div class="label">Percentage Read</div>
          <v-progress-circular
            :rotate="-90"
            :size="300"
            :width="50"
            :value="percentage"
            color="black"
            >{{ percentage }} %</v-progress-circular
          >
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card outlined>
          <div class="label">Daily Pages To Read</div>
          <div class="value">~ {{ daily_pages }}</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="buttons">
      <v-col cols="12" lg="6">
        <v-card outlined>
          <v-btn text @click="remove = true"> Untrack</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card outlined>
          <v-btn text @click="modal = true"> Add Pages</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="modal" max-width="290">
        <v-card>
          <AddPagesForm
            :BID="data.BID"
            :data="data"
            :r_pages="remain_pages"
            @close="updateGraph"
          />
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="remove" max-width="290">
        <v-card>
          <v-card-title>Warning</v-card-title>
          <v-card-text
            >Are You Sure? This operation is not reversible</v-card-text
          >
          <v-card-actions>
            <v-btn text @click="remove = false">Keep</v-btn>
            <v-btn text color="red" @click="untrack">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import AddPagesForm from "./AddPagesForm";
import moment from "moment";
import _ from "lodash";
import {delTracking} from "../../api/tracking.api";

export default {
  props: ["data", "title"],
  components: {
    AddPagesForm,
  },
  data() {
    return {
      labels: [],
      values: [],
      modal: false,
      remove: false,
      remain_pages: 0,
      pages_read: 0,
      daily_pages: 0,
      notes_saved: 0,
    };
  },
  watch: {
    data: function() {
      this.setGraphData();
      this.getRemainingPages();
      this.getDailyPages();
    },
  },
  computed: {
    percentage: function() {
      return parseInt((this.pages_read / this.data.total_pages) * 100);
    },
  },
  methods: {
    getDate: function(timestamp) {
      return moment.unix(timestamp).format("dddd Do MMM YYYY");
    },
    getRemainingPages: function() {
      let pages = _.map(this.data.dates, "pages");
      this.pages_read = _.sum(pages);
      this.remain_pages = this.data.total_pages - this.pages_read;
    },
    getDailyPages: function() {
      let leftDays = moment.unix(this.data.finish_date).diff(moment(), "days");
      this.daily_pages = Math.round(this.remain_pages / leftDays);
    },
    setGraphData: function() {
      if (this.data.dates.length < 1) {
        this.labels.push(
          moment.unix(this.data.add_date).format("D[/]M[/]YYYY")
        );
        this.labels.push(moment().format("D[/]M[/]YYYY"));
        this.values.push(0);
        this.values.push(0);
        return;
      }

      let first_date = moment.unix(this.data.dates[0].date);
      let last_date = moment.unix(
        this.data.dates[this.data.dates.length - 1].date
      );

      while (last_date.diff(first_date, "days") >= 0) {
        this.labels.push(" ");
        let value = this.data.dates.find((x) => x.date === first_date.unix());
        if (value) this.values.push(value.pages);
        else this.values.push(0);
        first_date.add(1, "days");
      }
      this.labels[0] = moment
        .unix(this.data.dates[0].date)
        .format("D[/]M[/]YYYY");
      this.labels[this.labels.length - 1] = moment
        .unix(this.data.dates[this.data.dates.length - 1].date)
        .format("D[/]M[/]YYYY");
    },
    updateGraph: function() {
      this.modal = false;
      this.labels = [];
      this.values = [];
      this.setGraphData();
    },
    untrack: function() {
      delTracking(this.data.UID,this.data.BID)
        .then(() => {
          this.$store.commit("setTracking", {});
          this.$toasted.success("Tracking Removed");
        })
        .catch(() => this.$toasted.error("An error occured try again"));
    },
  },
  mounted() {
    this.setGraphData();
    this.getRemainingPages();
    this.getDailyPages();
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .container {
    width: 60%;
    margin-top: 2em;
    .first_card {
      .v-card {
        padding: 1em;
        .title {
          font-size: xx-large !important;
          text-align: center;
        }
      }
    }
    .second_cards {
      .v-card {
        padding: 1em;
        .label {
          font-size: larger;
          font-weight: lighter;
          text-align: center;
        }
        .value {
          font-size: xx-large;
          text-align: center;
        }
      }
    }
    .graph {
      .v-card {
        padding: 1em;
        .text {
          font-weight: lighter;
          text-align: center;
          font-size: x-large;
        }
      }
    }
    .botttom_cards {
      .v-card {
        padding: 1em;
        text-align: center;
        .label {
          font-weight: lighter;
          text-align: center;
          font-size: x-large;
          margin-bottom: 0.5em;
        }
        .value {
          font-size: xx-large;
          text-align: center;
        }
      }
    }
    .buttons {
      .v-card {
        padding: 0.2rem;
        text-align: center;
      }
    }
  }
}
@media screen and (max-width: 990px) {
  .container {
    width: 100%;
    margin-top: 2em;
    .first_card {
      .v-card {
        padding: 1em;
        .title {
          font-size: xx-large !important;
          text-align: center;
        }
      }
    }
    .second_cards {
      .v-card {
        padding: 1em;
        .label {
          font-size: larger;
          font-weight: lighter;
          text-align: center;
        }
        .value {
          font-size: xx-large;
          text-align: center;
        }
      }
    }
    .graph {
      .v-card {
        padding: 1em;
        .text {
          font-weight: lighter;
          text-align: center;
          font-size: x-large;
        }
      }
    }
    .botttom_cards {
      .v-card {
        padding: 0.5em;
        text-align: center;
        .v-progress-circular {
          width: 70% !important;
        }
        .label {
          font-weight: lighter;
          text-align: center;
          font-size: x-large;
          margin-bottom: 0.5em;
        }
        .value {
          font-size: xx-large;
          text-align: center;
        }
      }
    }
    .buttons {
      .v-card {
        padding: 0.2rem;
        text-align: center;
      }
    }
  }
}
</style>
