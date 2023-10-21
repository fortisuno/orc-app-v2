import { NextRequest, NextResponse } from "next/server";
import { getUnixTime, subDays, subHours } from "date-fns";
import { NextURL } from "next/dist/server/web/next-url";
import { DateRange } from "react-day-picker";
import { ControlId, resolutions, views } from "./lib/controls";

const allowedParams = ["view", "resolution", "from", "to"];
const timestampRegex = /\b\d{10}\b/;

const defaultValues = {
	view: "corrected_data",
	resolution: "1_hour",
	from: subHours(new Date(), 1),
	to: new Date()
};

export const config = {
	matcher: "/range"
};

export function middleware(req: NextRequest) {
	const url = req.nextUrl;

	let changed = false;

	url.searchParams.forEach((_, key) => {
		if (!allowedParams.includes(key)) {
			url.searchParams.delete(key);
			changed = true;
		}
	});

	if (!url.searchParams.has(ControlId.View) || !views.some((item) => item.value === url.searchParams.get(ControlId.View))) {
		url.searchParams.set(ControlId.View, defaultValues.view);
		changed = true;
	}

	if (!url.searchParams.has(ControlId.Resolution) || !resolutions.some((item) => item.value === url.searchParams.get(ControlId.Resolution))) {
		url.searchParams.set(ControlId.Resolution, defaultValues.resolution);
		changed = true;
	}

	if (!url.searchParams.has(ControlId.From) || !timestampRegex.test(url.searchParams.get(ControlId.From) as string)) {
		url.searchParams.set(ControlId.From, getUnixTime(defaultValues.from).toString());
		changed = true;
	}

	if (!url.searchParams.has(ControlId.To) || !timestampRegex.test(url.searchParams.get(ControlId.To) as string)) {
		url.searchParams.set(ControlId.To, getUnixTime(defaultValues.to).toString());
		changed = true;
	}

	if (changed) {
		return NextResponse.redirect(url);
	}
}
