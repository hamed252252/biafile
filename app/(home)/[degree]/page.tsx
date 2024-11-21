import React from "react";

interface Params {
    degree: string;
}

async function Page({
    params,
}: {
    params: Promise<Params>;
}) {
    const resolvedParams = await params; // Await the Promise

    return <div>Degree: {resolvedParams.degree}</div>;
}

export default Page;
