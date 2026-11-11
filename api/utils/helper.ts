export const normalizeEmail = (email:string)=>email.trim().normalize('NFKC').toLowerCase()
