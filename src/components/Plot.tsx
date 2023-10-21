"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";

function Plot({ title }: { title: string }) {
	const searchParams = useSearchParams();
	const urlSearchParams = Object.fromEntries(searchParams.entries());
	return (
		<AspectRatio ratio={16 / 9}>
			<Card className="h-full">
				<CardContent className="p-5">
					<pre className="font-light text-muted-foreground">{JSON.stringify(urlSearchParams, null, 2)}</pre>
				</CardContent>
			</Card>
		</AspectRatio>
	);
}

export default Plot;
