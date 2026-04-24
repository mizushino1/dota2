

const rankTierMapping = {
    1: { name: "Herald" },
    2: { name: "Guardian" },
    3: { name: "Crusader" },
    4: { name: "Archon" },
    5: { name: "Legend" },
    6: { name: "Ancient" },
    7: { name: "Divine" },
    8: { name: "Immortal" }
};


const rankIconMapping = {
    1: { rankImg: "../assets/image/herald.webp" },
    2: { rankImg: "../assets/image/guardian.webp" },
    3: { rankImg: "../assets/image/crusader.webp" },
    4: { rankImg: "../assets/image/archon.webp" },
    5: { rankImg: "../assets/image/legend.webp" },
    6: { rankImg: "../assets/image/ancient.webp" },
    7: { rankImg: "../assets/image/divine.webp" },
    8: { rankImg: "../assets/image/immortal.webp" },
    0: { rankImg: "../assets/image/unranked.webp" }
  };


const getPlayerData = async () => {

    if (event) event.preventDefault(); 

    const friendCodeInput = document.getElementById("searchPlayerCode");
    const friendCode = friendCodeInput.value;
    
    console.log("Searching for:", friendCode);

    localStorage.setItem("savedFriendCode", friendCode);


    const profileUrl = `https://api.opendota.com/api/players/${friendCode}`;
    const heroesUrl = `https://api.opendota.com/api/players/${friendCode}/heroes`;

    // 2. Fetch both (you can even do this simultaneously for speed!)
    const [profileRes, heroesRes] = await Promise.all([
        fetch(profileUrl),
        fetch(heroesUrl)
    ]);

    const playerData = await profileRes.json();
    const heroData = await heroesRes.json();

    const playerName = playerData.profile.personaname;
    const playerAvatar = playerData.profile.avatarfull;
    const tierValue = playerData.rank_tier;
    const medalIndex = Math.floor(tierValue / 10);
    const playerRank = rankTierMapping[medalIndex] ? rankTierMapping[medalIndex].name : "Uncalibrated";
    const playerRankIcon = rankIconMapping[medalIndex] ? rankIconMapping[medalIndex].rankImg : "Uncalibrated";
    

    const elPlayerName = document.getElementById("playerName");
    elPlayerName.innerHTML = playerName;


    const elPlayerRank = document.getElementById("playerRank");
    elPlayerRank.innerHTML =`<div class="h5 mb-3 text-center">Current Rank: </div> <div class="d-flex flex-row"> <p class="mt-5 me-3"> ${playerRank} </p> <img class="img-fluid w-50" src="${playerRankIcon}"> </div>`

    const elPlayerAvatar = document.getElementById("playerAvatar");
    elPlayerAvatar.src = playerAvatar;

    const elPlayerFriendCode = document.getElementById("playerFriendCode");
    elPlayerFriendCode.innerHTML ="<b>Friend Code</b>: " + friendCode;



};


window.onload = () => {
    const lastCode = localStorage.getItem("savedFriendCode");
    if (lastCode) {
        // Put the code back in the input box
        document.getElementById("searchPlayerCode").value = lastCode;
        // Run the search automatically
        getPlayerData();
    }
};