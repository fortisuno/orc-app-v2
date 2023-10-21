"use client";

import React from "react";
import ListControl from "./ListControl";
import { ControlAction, useControls } from "@/lib/hooks/useControls";
import { fromUnixTime, getUnixTime, subDays } from "date-fns";
import { resolutions, views } from "@/lib/controls";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { DateControl } from "./DateControl";

function PlotControls() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [controls, handleControls] = useControls({
		view: searchParams.get("view")!,
		resolution: searchParams.get("resolution")!,
		from: fromUnixTime(Number(searchParams.get("from"))!),
		to: fromUnixTime(Number(searchParams.get("to"))!)
	});

	const setView = (value: string) => handleControls({ type: ControlAction.SetView, payload: value });
	const setResolution = (value: string) => handleControls({ type: ControlAction.SetResolution, payload: value });

	const updateSearchParams = () => {
		const params = new URLSearchParams(searchParams);
		params.set("view", controls.view);
		params.set("resolution", controls.resolution);
		params.set("from", getUnixTime(controls.from).toString());
		params.set("to", getUnixTime(controls.to).toString());
		router.push(pathname + "?" + params.toString());
	};

	return (
		<div className="flex">
			<div className="grid grid-cols-[175px_150px_250px] space-x-4">
				<ListControl label="V" selected={controls.view} onSelectedChange={setView} options={views} />
				<ListControl label="R" selected={controls.resolution} onSelectedChange={setResolution} options={resolutions} />
				<DateControl label="F" />
			</div>
			<div className="ml-auto">
				<Button className="w-full" onClick={updateSearchParams}>
					<Search className="mr-2 h-4 w-4" /> Search
				</Button>
			</div>
		</div>
	);
}

export default PlotControls;
