"use client";

import * as React from "react";
import { format, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ListControl from "./ListControl";

export function DateControl({ label }: { label?: string }) {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const [displayMonth, setDisplayMonth] = React.useState<Date>(date!);

	const years = React.useMemo(() => {
		const years = [];
		for (let i = 2000; i <= 2023; i++) {
			years.push({ value: i.toString(), label: i.toString() });
		}
		return years;
	}, []);

	const months = React.useMemo(() => {
		const months = [];
		for (let i = 0; i < 12; i++) {
			months.push({ value: i.toString(), label: format(new Date(2023, i), "MMMM") });
		}
		return months;
	}, []);

	const handleYear = (year: string) => {
		setDisplayMonth((prev) => setYear(prev, parseInt(year, 10)));
	};

	const handleMonth = (month: string) => {
		setDisplayMonth((prev) => setMonth(prev, parseInt(month, 10)));
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={"outline"} className={cn("w-[250px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
					{label && <span className="font-medium mr-2">{label}:</span>}
					{date ? format(date, "PPP - hh:mm") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-2">
				<div className="flex space-x-3">
					<div>
						<Calendar
							month={displayMonth}
							onMonthChange={setDisplayMonth}
							mode="single"
							fromYear={2000}
							toYear={2023}
							selected={date}
							required
							components={{ Caption: () => null }}
							onSelect={setDate}
							initialFocus
						/>
					</div>
					<div className="space-y-3">
						<div className="w-[250px] grid grid-cols-[100px_1fr] space-x-2">
							<ListControl allowScroll selected={displayMonth.getFullYear().toString()} onSelectedChange={handleYear} options={years} />
							<ListControl allowScroll selected={displayMonth.getMonth().toString()} onSelectedChange={handleMonth} options={months} />
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
