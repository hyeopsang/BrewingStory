export interface OpenStatus {
	isOpen: boolean;
	message: string; // 첫 번째 줄 + 두 번째 줄
}

export function getOpenStatusFromDescriptions(
	weekdayDescriptions: string[],
): OpenStatus {
	const now = new Date();
	const jsToday = now.getDay(); // 0: 일요일 ~ 6: 토요일
	const todayIndex = jsToday === 0 ? 6 : jsToday - 1;
	const nowMinutes = now.getHours() * 60 + now.getMinutes();

	const todayDesc = weekdayDescriptions[todayIndex];
	const { openMinutes, closeMinutes } = extractOpenCloseMinutes(todayDesc);

	const hasTodayInfo = openMinutes !== 0 || closeMinutes !== 0;
	let isOpen = false;
	let firstLine = "";
	let secondLine = "";

	if (!hasTodayInfo) {
		firstLine = ""; // 첫 번째 줄은 비워두기
		secondLine = ""; // 두 번째 줄도 비워두기
	} else {
		let adjustedClose = closeMinutes;
		if (closeMinutes <= openMinutes) {
			adjustedClose += 24 * 60; // 자정 이후로 마감 시간이 넘어가면 하루를 더함
		}

		if (nowMinutes >= openMinutes && nowMinutes < adjustedClose) {
			isOpen = true;
			firstLine = ""; // "영업 중"은 표시하지 않음
			secondLine = `오늘 ${formatHourMinute(closeMinutes)} 마감`; // 오늘 마감 시간 표시
		} else {
			isOpen = false;
			firstLine = ""; // 첫 번째 줄은 비워두기
			secondLine = ""; // 두 번째 줄도 비워두기
		}
	}

	// 내일 정보 확인
	if (!isOpen) {
		const jsTomorrow = (jsToday + 1) % 7;
		const tomorrowIndex = jsTomorrow === 0 ? 6 : jsTomorrow - 1;
		const tomorrowDesc = weekdayDescriptions[tomorrowIndex];
		const { openMinutes: tomorrowOpen, closeMinutes: tomorrowClose } =
			extractOpenCloseMinutes(tomorrowDesc);

		if (tomorrowOpen > 0) {
			secondLine = `내일 ${formatHourMinute(tomorrowOpen)} 오픈`; // 내일 오픈 시간
		} else if (tomorrowOpen === 0 && tomorrowClose === 0) {
			secondLine = "내일 휴무"; // 내일이 휴무일인 경우
		}
	}

	return {
		isOpen,
		message: `${firstLine}\n${secondLine}`.trim(), // 두 줄을 합친 메시지 반환 (여백 처리)
	};
}

function extractOpenCloseMinutes(desc: string): {
	openMinutes: number;
	closeMinutes: number;
} {
	const timeMatch = desc.match(
		/(오전|오후)\s?(\d+):(\d+)\s?~\s?(오전|오후)\s?(\d+):(\d+)/,
	);

	if (!timeMatch) {
		return { openMinutes: 0, closeMinutes: 0 };
	}

	const [
		,
		openMeridiem,
		openHour,
		openMin,
		closeMeridiem,
		closeHour,
		closeMin,
	] = timeMatch;

	const open = to24Hour(Number.parseInt(openHour), openMeridiem);
	const close = to24Hour(Number.parseInt(closeHour), closeMeridiem);

	return {
		openMinutes: open * 60 + Number.parseInt(openMin),
		closeMinutes: close * 60 + Number.parseInt(closeMin),
	};
}

function to24Hour(hour: number, meridiem: string): number {
	if (meridiem === "오전") {
		return hour === 12 ? 0 : hour;
	}
	return hour === 12 ? 12 : hour + 12;
}

function formatHourMinute(totalMinutes: number): string {
	const hour = Math.floor(totalMinutes / 60) % 24;
	const minute = totalMinutes % 60;
	const isPM = hour >= 12;
	const displayHour = hour % 12 === 0 ? 12 : hour % 12;
	const meridiem = isPM ? "오후" : "오전";
	const paddedMinute = minute.toString().padStart(2, "0");
	return `${meridiem} ${displayHour}:${paddedMinute}`;
}
