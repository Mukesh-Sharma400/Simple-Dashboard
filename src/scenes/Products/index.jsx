import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({ id, name, description, price, rating, category }) => {
  const theme = useTheme();

  return (
    <Card
      key={id}
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={Number(rating)} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
};

const SkeletonProduct = () => {
  const theme = useTheme();

  return (
    <Skeleton
      variant="rectangular"
      width={228}
      height={192}
      sx={{
        borderRadius: "0.55rem",
        backgroundColor: theme.palette.background.alt,
      }}
    />
  );
};

const Products = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (data) {
      const arrayOfObjects = data.map((innerArray) => ({
        id: innerArray[0] ?? "",
        name: innerArray[1] ?? "",
        price: innerArray[2] ?? 0,
        description: innerArray[3] ?? "",
        category: innerArray[4] ?? "",
        rating: innerArray[5] ?? 0,
        supply: innerArray[6] ?? "",
      }));
      setNewData(arrayOfObjects);
    }
  }, [data]);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  if (isLoading) {
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="See your list of products." />
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonProduct key={index} />
          ))}
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="Error loading products." />
        <Typography variant="body1">Failed to fetch products.</Typography>
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {newData.map(({ id, name, price, description, category, rating }) => (
          <Product
            key={id}
            id={id}
            name={name}
            price={price}
            description={description}
            category={category}
            rating={rating}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Products;
