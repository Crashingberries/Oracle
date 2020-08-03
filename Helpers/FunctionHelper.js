// This file should provide assistance for the help() command.
// It will save the default "help" strings for each of the supported commands,
// as well as an example of the command that further assists the user.
//
const Discord = require('discord.js')

var helpDictionary = Object();
var exampleDictionary = Object();
const ConfigHelper = require('../Helpers/ConfigHelper')

//Colors
const messageColorRed = "#af0000"
const messageColorGreen = "#5fff00"
const messageColorBlue = "#0099ff"
const messageColorSecondBlue = "#020ff0"

// Define dictionary with (string) key : (string) value.
// ex. helpDictionary["help"] = "Where you are now. A list of all available commands."
deckDictionary = {
    decks: "Lists all available decks",
    deckstats: "Lists stats information about decks",
    deckinfo: "Provides detailed information about a deck",
}
gameDictionary = {
    log: "Logs a game to this server's league",
    //remind: "Reminds users to confirm logged matches",
    pending: "Lists all unfinished matches",
    disputed: "Lists all disputed matches",
    info: "Provides information on a match",
}
leagueDictionary = {
    register: "Registers a user to participate in this server's league",
    top: "Lists the top users this season"
}
seasonDictionary = {
    seasoninfo: "Provides summary information about a season"
}
userDictionary = {
    profile: "Displays summary information about a user",
    recent: "Displays recent matches a user has played in",
    use: "Sets a user's current deck. Required to log games",
}
adminDictionary = 
{
    deletematch: "Removes a match from the records",
    acceptmatch: "Force a match to be logged",
    add: "Adds a new deck to your server's list of decks",
    removedeck: "Removes a deck from your server's list of decks",
    startseason: "Starts a new season",
    endseason: "Ends the current season",
    setendseason: "Sets an end date for the current season",
    setseasonname: "Sets a name for a season",
    setconfig: "Sets up configurations",
    getconfig: "Displays configuration information"
}

exampleDictionary =
{
    deletematch: "Use this function to force delete a match. This is an Admin-Only command that should be used in conjunction with !pending or !disputed and should be used with discretion.\
    Admins should use this command when they feel a game was wrongfully submitted. This can be for a variety of reasons including: players disputing matches, cheating, or many other reasons.\n\n\
    Use !pending to find a list of matches that haven't been accepted. Use !disputed to find a list of matches that have been disputed.\n\n\
    Example usage: !deletematch <Match ID>. ",
    acceptmatch: "Use this function to force accept a match. This is an Admin-Only command that should be used in conjunction with !pending or !disputed.\
    Use this function to accept matches that are in a pending or disputed state. This will force the matches to be recognized and counted towards deckstats, ratings, and other aspects of the bot.\n\n\
    Use !pending to find a list of matches that haven't been accepted. Use !disputed to find a list of matches that have been disputed.\n\n\
    Example usage: !accept <Match ID>.",
    add: "Use this function to add a new deck to your server's list of decks. This is an Admin-Only command that will allow users to have more options when setting their deck.\
    This function is meant to make this bot adaptive for all servers and metas. An initial seed of decks is provided to each server and will be curated in conjuction to the CEDH Database.\
    Add as many or as few decks as you want. We recommend adding a deck to your server once more than a few people play it. Users can track stats on their custom lists with the !use <Deck Name> | Rogue functionality,\
    so it is not necessary to add every deck users play.\n\n\
    !add Deck Alias | Commander | Color | Deck Link | Author | Deck Description | Deck Type | Has Primer? (Yes/No) | Discord Link.\n\n\
    Example usage: !add Sphinx Control | Unesh, Criosphinx Sovereign | https://www.google.com | Gnarwhal | This is a control deck that seeks to win through isochron scepter | Disruptive | No | https://discord.gg/12345 | ",
    removedeck: "Use this function to remove a deck from your server's list of decks.  This will remove the list, but will not remove stats about this deck from your server.\
    This is an Admin-Only command to remove old and outdecked deck. Or ones that are simply not used on your server. Curating your decklist is entirely optional\n\n\
    Example usage: !removedeck <Deck Name>",
    startseason:"Use this function to start a new season for this server. This is an Admin-Only command. When you start a season, the bot will automatically name the season a numerical value and assign indefinite end date.\
    When you start a season, users will be able to log matches, check their stats across decks and games, and much more. Seasons can be renamed and configured using a variety of commands including: \
    !setseasonname, !setendseason, !endseason and !seasoninfo. Starting a season is one of the first steps to setting up this bot for your server\n\n\
    Example usage: !startseason",
    endseason: "Use this function to end a season. This is an Admin-Only command. When a season ends: leaderboards are reset, player's personal ratings are reset and rewards are distributed. This command will also tell you\
    of any pending matches remaining in the current season. Ending a season is **final** and cannot be un-done\n\n\
    Example usage: !endseason",
    setendseason: "Use this function to set an automatic end date to a season. This is an Admin-Only command. Similar to the !endseason function, you will provide this function a date at which you want the current season to end\
    and it will end it automatically for you at the specified date. See !help endseason for more information on what ending a season does. \n\n\
    Example usage: !setendseason 12/12/2020",
    setseasonname: "Use this function to set the name of a season. This is an Admin-Only command that can be changed as many times as you want and as frequently as you want\n\n\
    Example usage: !setseasonname Season 2",
    setconfig: "Use this function to set the configurations for your server. This is an Admin-Only command. Default configurations for your server are provided\
    without the need for this command. This command will let you fine tune this experience in a variety of categories. These categories are:\n\n\
    'Player Threshold' - The number of games a player must play before appearing on the leaderboard\n\
    'Deck Threshold' - The number of games a deck must be used before appearing on a user's profile\n\
    'Timeout' - The amount of time before a game log timesout\n\
    'Admin' - The names of the roles of users with admin privileges in this server. Any user in your server with basic Discord Administrative privileges will be able to use admin commands.\
    Note: Write this as a list separated by commas.\n\n\
    Example usage: !setconfig <Config Type> | <New Value>. !setconfig Admin | Admin Role 1, Admin Role 2, Admin Role 3",
    getconfig: "Use this function to get the current configurations for your server. This is an Admin-Only command and should be used in conjunction with !setconfig. This function\
    should be used to check your current configurations for your server. To see more information about what configurations there are and their users, type !help setconfig\n\n\
    Example usage: !getconfig",

    decks: "Use this function to list all decks on this server. This command will organize by color and then alphabetize all decks. Use this function before you set your deck with !use <Deck Name>\n\n\
    Example usage: !decks",
    deckstats: "Use this function to find information about a decks statistics on this server. Add the 'all' modifier to any query to find information across all seasons. This is a versatile command that accepts many inputs. You can look up deck statistics for a server, for a season, for a deck and for a user\n\n\
    Generic usage:\n\
    !deckstats - lists overall deck information for this season in this server\n\
    !deckstats all - lists overall deck information in this server\n\
    !deckstats <Deck Name> - information about a deck this season\n\
    !deckstats | <Season Name> - lists overall deck information for this server in the specified season. Seasons are case sensitive!\n\
    !deckstats <Deck Name> | <Season Name> - information about a deck in the specified season\n\
    !deckstats @Username - information about a user's deck statistics for this season\n\
    !deckstats @Username | <Season Name> - information about a user's deck statistics for the specified season\n",
    deckinfo: "Use this function to find information about a specific deck. This command will return information on a variety of topics pertaining to the specified deck. Examples of information include: Deck Name, Commander, Color Identity, Deck List, and much more\n\
    Generic usage: !deckinfo <Deck Name>\n\
    Example usage: !deckinfo Gitrog Dredge",
    log: "Use this command once you have started a season to record game records into the bot's system. To successfully log matches, **the winner must type the log command and mention the three losers**. Logging matches is important part of this bot and will allow you to\
     record and review statistics about past games. All users must be **registered, using a deck and a season must be started** to successfully use this command\n\n\
    Generic usage: !log @loser1 @loser2 @loser3\n\
    Example usage: !log @Ryan @Cruz @Ben",
    pending: "Use this function to see a list of unconfirmed matches. Matches can be unconfirmed in a few ways. The most common way is users forgetting to confirm or contest match logs. This function will allow you to find a list of all pending matches. Admins can then force\
     these matches into an accepted state using the command !acceptmatch or they can delete them with !deletematch. More information found using !help acceptmatch and !help deletematch\n\n\
    Example usage: !pending",
    disputed: "Use this function to see a list of disputed matches. Matches are disputed when any user contests a match log (downvotes their confirm message). This command is to see a list of these disputed matches, and then force accept or force delete the with the !acceptmatch\
     or !deletematch commands. More information found using !help acceptmatch and !help deletematch\n\n\
    Example usage: !disputed",
    info: "Use this function to find information about a match. This information includes: Winnners, Losers, Time the match took place, etc. Find matches with commands such as !recent, !pending or !disputed. Learn more about each of these functions using !help recent, !help pending or !help disputed\n\n\
    Generic usage: !info <Match ID>\n\
    Example usage: !info 123456789123",
    register: "Use this function to register yourself for this server's league. Registering is a key step to accessing other portions of the bot. By registering your: matches will be logged, stats will be tracked, other users will be able to look you up and much more\n\n\
    Example usage: !register", 
    top: "Use this function to see the top players on the leaderboard for this server's current season. Players are assigned a point based value based on their number of wins and losses. A win gains you X points, while a loss loses you Y points. The system accounts for an average of 25% winrate.\
     The default number of games to appear on this list is 10 games. Admins are able to configure this value using !setconfig. Find more information about configurations with !help setconfig\n\n\
    Example usage: !top",
    seasoninfo: "Use this function to see information about the specified season. This command defaults to the current season when provided no arguments. Information provided includes: Season Name, Season Start Date, Season End Date, etc.\n\n\
    Generic usage: !seasoninfo or !seasoninfo <Season Name>. Season names **are case sensitive**\n\
    Example usage: \n\
    !seasoninfo My Season Name\n\
    !seasoninfo all",
    profile: "Use this function to see information about a user's statistics on the server. These statistics include: Current Deck, Rating, Favorite Deck, Winrate and specific Deck Stats breakdown. This function defaults to the user typing the command, but can lookup other users\n\n\
    Generic usage: !profile or !profile @User\n\
    Example usage: !profile or !profile @Gnarwhal",
    recent: "Use this function to see a list of recent matches. This command can look up by: user or season and can be modified with the key-words: 'Server' or 'More'. Typing 'Server' will provide recent matches on this server. Typing 'More' will increase the limit of returned matches\
     from 5 to 10\n\n\
    Generic usage: !recent or !recent more or !recent server or !recent @user\n\
    Example usage: !recent @Gnarwhal more, !recent @Gnarwhal, !recent server",
    use: "Use this function to set your current deck. Before using this command, make sure to type !register to register yourself for your server's league. This command will set your current deck until you change it.\
    After setting your deck, you are able to log matches with other users. This command will check your server's list of usable decks, type !decks to see this list. If you wish to use a deck outside of this list, please\
    use the 'Rogue' modifier to your command. Adding 'Rogue' to your !use command will let us know that you're using a list that isn't on your server's list of decks. You can log any deck with this modifier, and the bot will track\
    your stats for each deck used with the 'Rogue' modifier.\n\n\
    Generic usage: !use <Deck Name in Server's List of Decks> or !use <Any deckname> | Rogue\n\
    Example usage: !use gitrog dredge or !use Sphinx Tribal | Rogue"

}

module.exports = {
    /**
     * showEmbedHelpForCommand()
     * @param {*} receivedMessage 
     * @param {*} arguments - command key
     * 
     * Retrieves info from the help dictionary about a specific command. 
     */
    showEmbedHelpForCommand(receivedMessage, arguments)
    {
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor(messageColorBlue)
            exampleEmbed
            .setAuthor("Displaying information about the command: !" + [arguments])
            .addFields(
                { name: "Command Details", value: exampleDictionary[arguments] },
            )

        receivedMessage.channel.send(exampleEmbed);
    },

    /**
     * showEmbedHelpForAllCommands()
     * @param {*} receivedMessage 
     * 
     * Loops through command help dictionary and prints
     * out all commands supported in an embed message.
     */
    async showEmbedHelpForAllCommands(receivedMessage)
    {
        const deckEmbed = new Discord.MessageEmbed()
        .setAuthor("Deck Commands")
        .setColor(messageColorSecondBlue)
        const gameEmbed = new Discord.MessageEmbed()
        .setAuthor("Game Commands")
        .setColor(messageColorBlue)
        const leagueEmbed = new Discord.MessageEmbed()
        .setAuthor("League Commands")
        .setColor(messageColorSecondBlue)
        const seasonEmbed = new Discord.MessageEmbed()
        .setAuthor("Season Commands")
        .setColor(messageColorBlue)
        const userEmbed = new Discord.MessageEmbed()
        .setAuthor("User Commands")
        .setColor(messageColorSecondBlue)
        const adminEmbed = new Discord.MessageEmbed()
        .setAuthor("Admin Commands")
        .setColor(messageColorBlue)
        var embedArray = new Array()
        embedArray.push(deckEmbed, gameEmbed, leagueEmbed, seasonEmbed, userEmbed, adminEmbed)

        for(var keyVal in adminDictionary){
            adminEmbed.addField('!' + keyVal, adminDictionary[keyVal]);   
        }
        for (var keyVal in deckDictionary){
            deckEmbed.addField('!' + keyVal, deckDictionary[keyVal]);
        }
        for (var keyVal in gameDictionary){
            gameEmbed.addField('!' + keyVal, gameDictionary[keyVal]);
        }
        for (var keyVal in leagueDictionary){
            leagueEmbed.addField('!' + keyVal, leagueDictionary[keyVal]);
        }
        for (var keyVal in seasonDictionary){
            seasonEmbed.addField('!' + keyVal, seasonDictionary[keyVal]);
        }
        for (var keyVal in userDictionary){
            userEmbed.addField('!' + keyVal, userDictionary[keyVal]);
        }

        embedArray.forEach((embed)=>{
            receivedMessage.channel.send(embed)
        })
        
    }
}
