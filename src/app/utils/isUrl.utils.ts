export function isUrl(str:string):boolean
{
    try 
    {
        const url = new URL(str);
        return true;
    }
    catch (err)
    {
        return false;
    }
    
}