// pages/products/[category].js

import { useRouter } from 'next/router';

export async function getStaticPaths() {
    // Fetch all the categories you want to pre-render
    const categories = await fetchCategories(); // Replace with your own data fetching logic

    // Map the categories to an array of paths
    const paths = categories.map((category) => ({
        params: { category: category.slug }, // Adjust if needed
    }));

    return {
        paths,
        fallback: 'blocking', // You can use 'blocking' or 'true' depending on your preference
    };
}

export async function getStaticProps({ params }) {
    const { category } = params;
    // Fetch the data for this specific category
    const categoryData = await fetchCategoryData(category); // Replace with your own data fetching logic

    if (!categoryData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            categoryData,
        },
        revalidate: 10, // Re-generate the page at most every 10 seconds if a request comes in
    };
}

const CategoryPage = ({ categoryData }) => {
    const router = useRouter();

    // Show loading state if the page is not yet generated
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{categoryData.name}</h1>
            {/* Render your category data */}
        </div>
    );
};

export default CategoryPage;
