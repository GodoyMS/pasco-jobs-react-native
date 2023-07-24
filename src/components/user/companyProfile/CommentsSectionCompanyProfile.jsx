import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import { COLORS, FONT, SIZES } from "@constants/theme";
import woman from "@assets/images/manwoman/womanFlatIllustration.jpg";
import man from "@assets/images/manwoman/manFlatIllustration.jpg";
import { Icon } from "@rneui/themed";
import AgeDateFormat from "@components/dates/AgeDateFormat";
import CommentCompanyCard from "./CommentCompanyCard";
import ScreenLoader from "@components/loaders/ScreenLoader";

const CommentsSectionCompanyProfile = ({ idCompany }) => {
  const [data, setData] = useState([]); // Array to store the fetched data
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // Current page number
  
  const GET_COMMENTS_BY_COMPANY = gql`
    query GET_COMMENTS_BY_COMPANY($employerId:String!  
      $page: Int! ) {
      CompanyComments(where: { company: { equals: $employerId }  }  limit:6  page:$page ) {
        totalDocs
        hasNextPage
        page
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
  const {
    loading,
    error,
    data: dataComments,
  } = useQuery(GET_COMMENTS_BY_COMPANY, {
    variables: { employerId: idCompany,page },

    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!loading && dataComments) {
      setData((prevData) => [...prevData, ...dataComments?.CompanyComments?.docs]);
    }
  }, [loading, dataComments]);

  const fetchData = () => {
    if (!isLoading && dataComments?.CompanyComments?.hasNextPage) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return isLoading ? <ActivityIndicator color={COLORS.tertiary} /> : null;
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (loading && page === 1) {
    return <ScreenLoader loading={loading} />;
  }

  if (error) {
    return (
      <View>
        <Text> Error loading data </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <Text style={{ paddingVertical: 10 }}>
        ({data?.CompanyComments?.totalDocs} comentarios)
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <CommentCompanyCard item={item} />}
        keyExtractor={(item, index) => item.id.toString()}
        onEndReached={fetchData} // Trigger fetching more data when reaching the end
        onEndReachedThreshold={0.6} // Adjust the threshold as needed
        ListFooterComponent={renderFooter} 
       
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
