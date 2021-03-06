export const orgBudget = {
  header: 'All budgets ({{count}})',

  code: 'Code',
  name: 'Name',
  active: 'Status',
  currency: 'Currency',
  amount: 'Amount',
  unit: 'Unit',
  businessUnits: 'Unit',
  dateRange: 'Start - End',
  startDate: 'Start',
  endDate: 'End',
  actions: '',

  byName: 'Sort by name',
  byUnitName: 'Sort by unit',
  byCode: 'Sort by code',
  byValue: 'Sort by value',

  details: {
    title: 'Budget Details',
    subtitle: 'Budget: {{ item.name }}',
  },

  edit: {
    title: 'Edit Budget',
    subtitle: 'Budget: {{ item.name }}',
  },

  create: {
    title: 'Create Budget',
    subtitle: '',
  },

  messages: {
    deactivate: 'Are you sure you want to disable this budget?',
    confirmEnabled: 'Budget {{ item.name }} enabled successfully',
    confirmDisabled: 'Budget {{ item.name }} disabled successfully',
    update: 'Budget {{ item.name }} updated successfully',
    create: 'Budget {{ item.name }} created successfully',
  },
  info: {
    disabledEdit: 'Enable the budget to allow editing.',
    disabledEnable: 'Unit must be enabled before this budget may be enabled.',
  },

  links: {
    costCenters: 'Cost Centers',
  },

  breadcrumbs: {
    list: 'All budgets',
    details: '{{name}}',
  },
};

export const orgBudgetAssignedCostCenters = {
  title: 'Cost centers',
  subtitle: 'Budget: {{ item.name }}',
};
