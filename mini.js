function calculateTeamFinanceReport(salaries, team) {
  const report = { totalBudgetTeam: 0 };
  for (const employee of team) {
    if (!Object.hasOwn(salaries, employee.specialization)) continue;

    const specializationBudget = `totalBudget${employee.specialization}`;

    const salary = parseInt(salaries[employee.specialization].salary);
    const tax = parseInt(salaries[employee.specialization].tax);

    if (salary > 100000 || salary < 100)
      throw new Error('Salary must be in the range between 100 and 100000');

    if (tax > 99 || tax < 0)
      throw new Error('Tax must be in the range between 0% and 99%');

    const salaryWithTax = salary + (salary / 100) * tax;

    report.totalBudgetTeam += salaryWithTax;
    report[specializationBudget] =
      salaryWithTax + (report[specializationBudget] || 0);
  }

  Object.keys(report).forEach(
    (budget) => (report[budget] = Math.trunc(report[budget]))
  );

  return report;
}
