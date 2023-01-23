// Require "target": "ES2022" in the tsconfig file.

type Salaries = { [specialization: string]: { salary: number; tax: string } };
type Team = { name: string; specialization: string }[];
type Report = { [budget: string]: number };

function percentage(number: number, percentage: number) {
  return (number / 100) * percentage;
}

function calculateTeamFinanceReport(salaries: Salaries, team: Team): Report {
  validateSalaries(salaries);

  const report: Report = {};
  report.totalBudgetTeam = 0;

  for (const employee of team) {
    if (!Object.hasOwn(salaries, employee.specialization)) continue;

    const specializationBudget = `totalBudget${employee.specialization}`;
    const { salary, tax } = salaries[employee.specialization];
    const salaryWithTax = salary + percentage(salary, parseInt(tax));

    report.totalBudgetTeam += salaryWithTax;
    Object.hasOwn(report, specializationBudget)
      ? (report[specializationBudget] += salaryWithTax)
      : (report[specializationBudget] = salaryWithTax);
  }

  // Truncate the fractional part after all calculations
  for (const budget in report) {
    report[budget] = Math.trunc(report[budget]);
  }

  return report;
}

function validateSalaries(salaries: Salaries) {
  for (const value of Object.values(salaries)) {
    validateSalary(value.salary);
    validateTax(value.tax);
  }
}

function validateSalary(salary: number) {
  const throwInvalidSalaryError = (salary: number) => {
    throw new Error(`
    Invalid salary value: "${salary}". It must be at least 1.`);
  };

  if (salary < 1) {
    throwInvalidSalaryError(salary);
  }
}

function validateTax(tax: string) {
  const checkPercentString = (value: string) => {
    if (!/%$/.test(value) || isNaN(percentNumberFromString(value))) {
      throwInvalidTaxError(value);
    }
  };

  const percentNumberFromString = (value: string) => {
    const value_without_percent = value.replace(/%$/, '');
    if (isNaN(Number(value_without_percent))) {
      throwInvalidTaxError(value);
    }
    return parseInt(value.replace(/%$/, ''));
  };

  const throwInvalidTaxError = (value: string) => {
    throw new Error(`
    Invalid tax percent value: "${value}". It must be a number followed by "%".`);
  };

  checkPercentString(tax);
}

const salaries = {
  Manager: { salary: 1000, tax: '10%' },
  Designer: { salary: 600, tax: '30%' },
  Artist: { salary: 1500, tax: '15%' },
  TeamLead: { salary: 1000, tax: '99%' },
  Architect: { salary: 9000, tax: '34%' },
};
const team = [
  { name: 'Misha', specialization: 'Manager' },
  { name: 'Max', specialization: 'Designer' },
  { name: 'Vova', specialization: 'Designer' },
  { name: 'Leo', specialization: 'Artist' },
  { name: 'Alexander', specialization: 'TeamLead' },
  { name: 'Gaudi', specialization: 'Architect' },
  { name: 'Koolhas', specialization: 'Architect' },
  { name: 'Foster', specialization: 'Architect' },
  { name: 'Napoleon', specialization: 'General' },
];
const financeReport = calculateTeamFinanceReport(salaries, team);
console.log(JSON.stringify(financeReport));
