export interface IExpense {
	description: string;
	amount: number;
	paidBy: string;
	participants: string[];
	settled: boolean;
}
