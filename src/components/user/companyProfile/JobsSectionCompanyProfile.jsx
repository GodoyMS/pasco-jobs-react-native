import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { COLORS, FONT, SIZES } from "@constants/theme";

import { Icon } from "@rneui/themed";
import AgeDateFormat from "@components/dates/AgeDateFormat";
import { useNavigation } from "@react-navigation/native";
import JobCompanyProfileCard from "./JobCompanyProfileCard";
const JobsSectionCompanyProfile = ({ idCompany }) => {
const navigation=useNavigation()
const navigateToDetails = (idJob) => {
  navigation.navigate("JobDetails", { itemId:idJob });
};
  const GET_COMMENTS_BY_COMPANY = gql`
    query GET_JOBS_BY_COMPANY_IN_COMPANY_PROFILE($employerId: String!) {
      Jobs(where: { author: { equals: $employerId } }) {
        totalDocs
        docs{
          title
          id
          createdAt
          province
          district          
          createdAt      
        }
      }
    }
  `;


   const { error, data } = useQuery(GET_COMMENTS_BY_COMPANY, {
    variables: { employerId: idCompany },

    fetchPolicy: "cache-and-network",
  });

 
  return (
    <View style={{ flex: 1}}>
      <Text style={{ paddingVertical: 10 }}>({data?.Jobs?.totalDocs} ofertas)</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data ? data.Jobs.docs : []}
        renderItem={({ item }) => (
          <JobCompanyProfileCard item={item} navigateToDetails={navigateToDetails} />
        )} 
        keyExtractor={(item, index) => item.id.toString()}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  commentItem: {
    marginBottom: 8,
  },
  commentText: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
  },
  commentForm: {
    marginTop: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  starButton: {
    padding: 4,
  },
  submitButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
};

export default JobsSectionCompanyProfile;
