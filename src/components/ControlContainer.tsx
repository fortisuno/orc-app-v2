import React from "react";
import { Label } from "./ui/label";

function ControlContainer({ label, children }: { label?: string; children: React.ReactNode }) {
	return (
		<div className="space-y-2">
			{label && <Label>{label}</Label>}
			{children}
		</div>
	);
}

export default ControlContainer;
