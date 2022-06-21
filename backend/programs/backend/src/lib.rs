use anchor_lang::prelude::*;


declare_id!("FqSk7oCrBdrowe6yaLi7fUw1VbHyfxkXUuyDuWtSgEki");
// HaN9QgnKfSybk35ypJjFDJNd9nU2JtDb9XELZaydxFN9 || Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS
// Program Id: FqSk7oCrBdrowe6yaLi7fUw1VbHyfxkXUuyDuWtSgEki

#[program]
pub mod backend {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
