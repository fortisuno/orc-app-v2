import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function useListControl(selected: string) {
	const [value, setValue] = useState(selected);
	return [value, setValue];
}
