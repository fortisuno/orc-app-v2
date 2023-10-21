import * as React from "react";

export const enum ControlAction {
	SetView,
	SetResolution,
	SetFrom,
	SetTo
}

type State = {
	view: string;
	resolution: string;
	from: Date;
	to: Date;
};

type Action =
	| { type: ControlAction.SetView; payload: string }
	| { type: ControlAction.SetResolution; payload: string }
	| { type: ControlAction.SetFrom; payload: Date }
	| { type: ControlAction.SetTo; payload: Date };

export function useControls(initialState: State) {
	const [state, dispatch] = React.useReducer((state: State, action: Action) => {
		switch (action.type) {
			case ControlAction.SetView:
				return { ...state, view: action.payload };
			case ControlAction.SetResolution:
				return { ...state, resolution: action.payload };
			case ControlAction.SetFrom:
				return { ...state, from: action.payload };
			case ControlAction.SetTo:
				return { ...state, to: action.payload };
			default:
				throw new Error("Invalid action type");
		}
	}, initialState);

	return [state, dispatch] as const;
}
