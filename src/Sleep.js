function sleepFor(sleepDuration) {
	const now = new Date().getTime();
	while (new Date().getTime() < now + sleepDuration) {
		/* Do nothing */
	}
}
// export { sleepFor };
