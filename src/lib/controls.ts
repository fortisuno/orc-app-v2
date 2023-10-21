export const enum View {
	CorrectedData = "corrected_data",
	Pressure = "pressure"
}

export const enum Resolution {
	OneDay = "1_day",
	OneHour = "1_hour",
	OneMinute = "1_minute",
	FiveMinutes = "5_minutes"
}

export const enum ControlId {
	View = "view",
	Resolution = "resolution",
	From = "from",
	To = "to"
}

export const views = [
	{ value: View.CorrectedData, label: "Corrected Data" },
	{ value: View.Pressure, label: "Pressure" }
];

export const resolutions = [
	{ value: Resolution.OneDay, label: "1 Day" },
	{ value: Resolution.OneHour, label: "1 Hour" },
	{ value: Resolution.OneMinute, label: "1 Minute" },
	{ value: Resolution.FiveMinutes, label: "5 Minutes" }
];
