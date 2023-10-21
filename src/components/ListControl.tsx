"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ControlContainer from "./ControlContainer";
import { cn } from "@/lib/utils";

function ListControl({
	label,
	selected,
	onSelectedChange,
	options,
	allowScroll = false
}: {
	label?: string;
	allowScroll?: boolean;
	selected: string;
	onSelectedChange: (value: string) => void;
	options?: { value: string; label: string }[];
}) {
	const selectedLabel = React.useMemo(() => {
		const option = options?.find((option) => option.value === selected);
		return option?.label;
	}, [options, selected]);

	return (
		<Select value={selected} onValueChange={onSelectedChange}>
			<SelectTrigger className="w-auto">
				<SelectValue asChild>
					<div className="space-x-2">
						{label && <span className="font-medium">{label}:</span>}
						<span>{selectedLabel}</span>
					</div>
				</SelectValue>
			</SelectTrigger>
			<SelectContent className={cn(allowScroll && "overflow-y-auto max-h-64")}>
				{options &&
					options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
}

export default ListControl;
