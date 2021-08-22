export default async function help(args: string[]): Promise<void> {
  console.log(`
Commands:
generate <name> - Generate a new component
help - Show this help
  `);
}
