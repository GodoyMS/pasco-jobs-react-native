import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import { COLORS, FONT, SIZES } from "@constants/theme";
import woman from "@assets/images/manwoman/womanFlatIllustration.jpg";
import man from "@assets/images/manwoman/manFlatIllustration.jpg";
import { Icon } from "@rneui/themed";
import AgeDateFormat from "@components/dates/AgeDateFormat";
import CommentCompanyCard from "./CommentCompanyCard";


const CommentsSectionCompanyProfile = ({ idCompany }) => {


  const GET_COMMENTS_BY_COMPANY = gql`
    query GET_COMMENTS_BY_COMPANY($employerId: String!) {
      CompanyComments(where: { company: { equals: $employerId } }) {
        totalDocs
        docs {
          user {
            profile
            name
            position
            sex
          }
          id
          text
          createdAt
          stars
        }
      }
    }
  `;
  const { error, data } = useQuery(GET_COMMENTS_BY_COMPANY, {
    variables: { employerId: idCompany },

    fetchPolicy: "cache-and-network",
  });

  
  return (
    <View style={{ flex: 1,marginHorizontal:10 }}>
      <Text style={{ paddingVertical: 10 }}>({data?.CompanyComments?.totalDocs} comentarios)</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data ? data.CompanyComments.docs : []}
        renderItem={({ item }) => (
          <CommentCompanyCard item={item}  />
        )}         keyExtractor={(item, index) => item.id.toString()}
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

export default CommentsSectionCompanyProfile;
