function calculateTeamFinanceReport(salaries, team) {
  const report = { totalBudgetTeam: 0 };
  for (const employee of team) {
    if (!Object.hasOwn(salaries, employee.specialization)) continue;
    const specializationBudget = `totalBudget${employee.specialization}`;
    const { salary, tax } = salaries[employee.specialization];
    const salaryWithTax = salary + (salary / 100) * parseInt(tax);
    report.totalBudgetTeam += salaryWithTax;
    report[specializationBudget] = salaryWithTax + (report[specializationBudget] || 0);
  }
  Object.keys(report).forEach((budget) => (report[budget] = Math.trunc(report[budget])));
  return report;
}
