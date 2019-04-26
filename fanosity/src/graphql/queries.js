import { gql } from "apollo-boost";

export const getBands = gql`
  query allbands($aspect: String!) {
      getBandsByEvent(eventId: "event_2015_bend-make-a-band") {
        name
        bandId
        primaryImage(aspect: $aspect) {
          url
        }
      }
    }`;