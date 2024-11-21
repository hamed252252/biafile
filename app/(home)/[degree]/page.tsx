import React from "react";

interface Params {
    degree: string;
}

function Page({ params }: { params: Params }) {
    return <div>Degree: {params.degree}</div>;
}

export default Page;
