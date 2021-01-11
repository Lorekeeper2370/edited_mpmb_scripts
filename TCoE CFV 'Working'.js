var iFileName = "ua_20191104_Class-Feature-Variants.js";
RequiredSheetVersion(13);
// This file adds the content from the Unearthed Arcana: Class Feature Variants article to MPMB's Character Record Sheet

// Define the source
SourceList["TCoE"] = {
	name : "Tasha's Cauldron of Everything",
	abbreviation : "TCoE",
	group : "Primary Sources",
	url : "https://dnd.wizards.com/products/tabletop-games/rpg-products/tashas-cauldron-everything",
	date : "2020/11/17"
};

// Proficiency Versatility is not something governed by import automation, thus skipped

// Barbarian alternative class features
AddFeatureChoice(ClassList.barbarian.features, true, "Survival Instincts", {
	name : "Survival Instincts",
	source : ["TCoE", 24],
	minlevel : 1,
	description : desc([
		"Once at 3rd level and again at 10th level, I gain proficiency in one option available to Barbarians at level 1",
		"I can choose from Animal Handling, Medicine, Nature, Perception, and Survival"
	]),
	skillstxt : "Proficiency one from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival"
});
AddFeatureChoice(ClassList.barbarian.features["rage"], true, "Instinctive Pounce", {
	name : "Instinctive Pounce",
	source : ["TCoE", 24],
	minlevel : 7,
	description : desc([
		"As part of the bonus action to enter my rage, I can move up to half my speed ",
	]),
	action : [["bonusaction", "(while entering rage)"]]
});

// Bard alternative class features enhancements
AddFeatureChoice(ClassList.bard.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Bard Spell List",
	source : ["TCoE", 27],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "bard" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["cause fear-xgte", "color spray", "command", "aid", "enlarge/reduce", "mirror image", "intellect fortress", "mass healing word", "slow", "phantasmal killer", "rary's telepathic bond", "heroes' feast", "dream of the blue veil", "prismatic spray", "antipathy/sympathy", "prismatic wall"]);
			},
			"This alternative class feature enhancement expands the spells list of the bard class."
		]
	}
}, "Bard Spellcasting Enhancement");
AddFeatureChoice(ClassList.bard.features["bardic inspiration"], true, "Magical Inspiration", {
	name : "Magical Inspiration",
	source : ["TCoE", 27],
	description : desc([
		"A bardic inspiration die recipient can also use it when casting a damaging or healing spell",
		"They can expend the die and add its result to one damage or healing roll of the spell"
	])
}, "Bardic Inspiration Enhancement");
AddFeatureChoice(ClassList.bard.features.spellcasting, true, "Spell Versatility", {
	name : "Bardic Versatility",
	source : ["TCoE", 28],
	description : "\n   Whenever I reach a level in this class that grants the Ability Score Improvement, I can do one of the following, representing a change in focus as you use your skills and magic",
	"Replace one of the skills I chose for the Expertise feature with one of my other skill proficiencies that isn't benefiting from Expertise":
	"Replace one cantrip you learned I learned from this class's Spellcasting feature with another cantrip from the bard spell list",
}, "Bard Spellcasting Enhancement");

// Cleric alternative class features and enhancements
AddFeatureChoice(ClassList.cleric.features.spellcasting, true, "Cantrip Versatility", {
	name : "Cantrip Versatility",
	source : ["TCoE", 31],
	description : "\n   Whenever I gain an Ability Score improvement from this class, I can replace a cleric cantrip I know with another cantrip on the cleric spell list"
}, "Cleric Spellcasting Enhancement");
AddFeatureChoice(ClassList.cleric.features.spellcasting, true, "Expanded Spell List", {
	name : "Additional Cleric Spells",
	source : ["TCoE", 30],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "cleric" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["aura of life", "aura of purity", "summon celestial", "sunbeam", "sunburst", "power word heal"]);
			},
			"This alternative class feature enhancement expands the spells list of the cleric class."
		]
	}
}, "Cleric Spellcasting Enhancement");
AddFeatureChoice(ClassList.cleric.features["channel divinity"], true, "Harness Divine Power", {
	name : "Channel Divinity: Harness Divine Power",
	source : ["TCoE", 30],
	minlevel : 2,
	description : "\n   As a bonus action, I can use my holy symbol and a prayer to regain 1 used spell slot, no higher than half of my proficiency bonus, rounded up",
	action : [["bonus action", ""]],
	usages : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
	recovery : "long rest",
}, "Channel Divinity Enhancement");
// Cleric subclass alternative feature, so only run this after we are sure all subclasses have been added
RunFunctionAtEnd(function() {
	for (var i = 0; i < ClassList.cleric.subclasses[1].length; i++) {
		var aDomain = ClassSubList[ClassList.cleric.subclasses[1][i]];
		if (!aDomain || !aDomain.features.subclassfeature8 || !(/divine strike|potent spellcasting/i).test(aDomain.features.subclassfeature8.name)) continue;
		CreateClassFeatureVariant(ClassList.cleric.subclasses[1][i], "subclassfeature8", "Blessed Strikes", {
			name : "Blessed Strikes",
			source : ["TCoE", 31],
			description : desc([
				"When a creature is damaged by one of my cantrips or weapon attacks, I can deal an additional 1d8 radiant damage",
				"Once I deal this extra damage, I can't do so again until the start of my next turn"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && !v.isDC) {
							fields.Description += (fields.Description ? '; ' : '') + 'Once per round +1d8 radiant damage';
						}
					},
					"Once per turn when a creature takes damage from one of my cantrips or weapon attacks, I can also deal 1d8 radiant damage to the target."
				]
			}
		});
	}
});

// Druid alternative class features and enhancements
AddFeatureChoice(ClassList.druid.features.spellcasting, true, "Cantrip Versatility", {
	name : "Cantrip Versatility",
	source : ["TCoE", 36],
	description : "\n   Whenever I gain an Ability Score Improvement in this class, I can replace a druid cantrip I know with another"
}, "Druid Spellcasting Enhancement");
AddFeatureChoice(ClassList.druid.features.spellcasting, true, "Expanded Spell List", {
	name : "Additional Druid Spells",
	source : ["TCoE", 35],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "druid" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["protection from evil and good", "augury", "continual flame", "enlarge/reduce", "summon beast", "aura of vitality", "elemental weapon", "revivify", "summon fey", "summon elemental", "divination", "fire shield", "cone of cold", "flesh to stone", "symbol", "incendiary cloud"]);
			},
			"This alternative class feature enhancement expands the spells list of the druid class."
		]
	}
}, "Druid Spellcasting Enhancement");
var wildCompanionObject = {
	name : "Wild Companion",
	source : ["TCoE", 35],
	description : desc([
		"I can expend a use of wild shape to cast Find Familiar without material components",
		"The familiar always has the Fey type and disappears after half my druid level in hours"
	]),
	additional : levels.map(function (n) {
		return n < 2 ? "" : Math.floor(n/2) + " hours";
	}),
	spellcastingBonus : {
		name : "Wild Companion",
		spells : ["find familiar"],
		selection : ["find familiar"],
		firstCol : "Sp"
	},
	spellChanges : {
		"find familiar" : {
			components : "V,S",
			compMaterial : "",
			description : "Gain the services of a fey familiar; can see through its eyes; it can deliver touch spells; see B;",
			duration : "\u00BD druid lvl h",
			changes : "By using my Wild Companion class feature, I can expend a use of wild shape to cast Find Familiar without material components. The familiar created this way always has the Fey type and disappears after a number of hours equal to half my druid level."
		}
	}
}
AddFeatureChoice(ClassList.druid.features["subclassfeature2.wild shape"], true, "Wild Companion", wildCompanionObject, "Wild Shape Enhancement");
if (ClassSubList["druid-circle of the moon"]) {
	AddFeatureChoice(ClassSubList["druid-circle of the moon"].features["subclassfeature2.wild shape"], true, "Wild Companion", wildCompanionObject, "Wild Shape Enhancement");
}

// The enhancement option for fighting styles has to be added to each class separately
AddFeatureChoice(ClassList.fighter.features["fighting style"], true, "Martial Versatility", {
	name : "Martial Versatility",
	source : ["TCoE", 42],
	minlevel : 4,
	description : "\n   Whenever I gain an Ability Score Improvement from fighter levels, I can swap a fighting style I know for another I'm allowed, or I can replace one maneuver with another I know I'm allowed"
}, "Fighting Style Enhancement");
// All the other fighting styles are available for all three classes, fighter, paladin, and ranger, so add them to all three here
AddFightingStyle(["fighter", "ranger", "paladin"], "Blind Fighting", {
	name : "Blind Fighting Style",
	source : ["TCoE", 41],
	description : desc([
		"You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness.",
		"Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you."
	]),
	vision : [["Blindsight", 10]]
});
AddFightingStyle(["fighter", "ranger", "paladin"], "Interception", {
	name : "Interception Fighting Style",
	source : ["TCoE", 41],
	description : desc([
		"As a reaction when a creature I can see hits a target, other than me, within 5 ft of me, I can intercept",
		"I reduce the damage the target takes by 1d10 + my Proficiency Bonus (min 0 damage)",
		"I must be wielding a shield, or a simple or martial weapon"
	]),
	action : [["reaction", ""]]
});
AddFightingStyle(["fighter", "ranger", "paladin"], "Thrown Weapon Fighting", {
	name : "Thrown Weapon Fighting Style",
	source : ["TCoE", 42],
	description : desc([
		"I can draw a weapon with the thrown property as part of the attack I make with it",
		"In addition, my ranged attacks made with thrown weapons deal +2 damage"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon && (/thrown/i).test(fields.Description)) {
					if (v.isMeleeWeapon) fields.Description += (fields.Description ? '; ' : '') + '+2 damage when thrown';
				}
			},
			"I deal +2 damage when I hit a ranged attack made with a thrown weapon."
		]
	}
});
AddFightingStyle(["fighter", "ranger", "paladin"], "Unarmed Fighting", {
	name : "Unarmed Fighting Style",
	source : ["TCoE", 42],
	description : desc([
		"My unarmed strikes deal 1d6, or 1d8 damage when I have both hands free, + my Strength modifier on a hit",
		"At the start of each of my turns, I can deal 1d4 bludgeoning damage to one creature grappled by me",
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.baseWeaponName == "unarmed strike") {
					if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4") fields.Damage_Die = '1d6';
					fields.Description += (fields.Description ? '; ' : '') + 'Versatile (d8)';
				};
			},
			"My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I have both hands free to make an unarmed strike with."
		]
	}
});
if (ClassSubList["fighter-battle master"]) {
	// Fighter alternative class features and enhancements (only if Battle Master subclass exists)
	AddFightingStyle(["fighter"], "Superior Technique", {
		name : "Superior Technique",
		source : ["TCoE", 41],
		description : " [1 maneuver; d6, 1\xD7 per short rest]" + desc([
			"I gain one superiority die (d6) that I can expend to fuel a special Maneuver",
			"I can only use one Maneuver per attack; DCs are 8 + Prof B. + Str/Dex mod, my choice",
			'Use the "Choose Feature" button above to add a Maneuver to the third page'
		]),
		eval : function () {
			AddFeature('Combat Superiority ', 1, '(d6)', 'short rest', 'Fighter: Superior Technique Fighting Style', 'bonus');
			DontPrint("Class Features Menu");
		},
		removeeval : function () {
			RemoveFeature('Combat Superiority ', 1);
			if (!MakeClassMenu()) Hide("Class Features Menu");
		}
	});
	// New Maneuver options for the Battle Master
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Ambush", {
		name : "Ambush",
		source : ["TCoE", 42],
		description : "\n   When I make an initiative roll or a Dex (Stealth) check, I can add a superiority die to it, provided I'm not incapacitated"
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Bait and Switch", {
		name : "Bait and Switch",
		source : ["TCoE", 42],
		description : desc([
			"On my turn, I can expend a superiority die to swap places with a creature within 5 ft",
			"Doing this costs me 5 ft of movement, but this doesn't provoke opportunity attacks",
			"The ally or me (my choice) then adds the superiority die to its AC until the start of my next turn"
		])
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Brace", {
		name : "Brace",
		source : ["TCoE", 42],
		description : desc([
			"As a reaction when a creature I can see moves within 5 of me, I can attack it",
			"I expend a superiority die and make one weapon attack, adding the die to the damage"
		]),
		action : [["reaction", ""]]
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Grappling Strike", {
		name : "Grappling Strike",
		source : ["TCoE", 42],
		description : desc([
			"Immediately after hitting with a melee weapon attack, I can use a bonus action to grapple",
			"I add the superiority die to the Str (Athletics) check; I can only do this on my own turn"
		]),
		action : [["bonus action", " (after melee weapon hit)"]]
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Commanding Presence", {
		name : "Commanding Presence",
		source : ["TCoE", 42],
		description : "\n   When I make a Cha (Deception), Cha (Persuasion), or Cha (Intimidation) check, I can add a superiority die to it"
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Quick Toss", {
		name : "Quick Toss",
		source : ["TCoE", 42],
		description : desc([
			"As a bonus action, I can expend a superiority die and make a ranged weapon attack",
			"I can draw a thrown weapon as part of making this attack; I add the die to the damage"
		]),
		action : [["bonus action", ""]]
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Studious Eye", {
		name : "Tactical Assessment",
		source : ["TCoE", 42],
		description : "\n   When I make a Wis (Insight), Int (Investigation), or Int (History) check, I can add a superiority die to it"
	});
}

// Monk class features enhancements
CreateClassFeatureVariant("monk", "martial arts", "Choose Monk Weapons", {
	name : "Dedicated Weapon",
	source : ["TCoE", 48],
	minlevel : 2 ,
	description : desc([
		"Whenever I finish a short or long rest, I can touch one weapon and focus my ki on it to make it count as a monk weapon until I use this feature again",
		"The chosen weapon must meet these criteria: The weapon must be a simple or martial weapon; I must be proficient with it; It must lack the heavery and special properties",
	]),
	eval : function() {
		ClassList.monk.features["martial arts"].extrachoicesNotInMenu = false;
	},
	removeeval : function() {
		ClassList.monk.features["martial arts"].extrachoicesNotInMenu = true;
		var monkWeapons = GetFeatureChoice("classes", "monk", "martial arts", true);
		for (var i = 0; i < monkWeapons.length; i++) {
			ClassFeatureOptions(['monk', 'martial arts', monkWeapons[i], 'extra'], "remove");
		}
	},
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				var monkWeapons = ["unarmed strike"].concat(GetFeatureChoice("classes", "monk", "martial arts", true));
				if (classes.known.monk && classes.known.monk.level && (monkWeapons.indexOf(v.baseWeaponName) != -1 || (/monk weapon/i).test(v.WeaponText))) {
					var aMonkDie = function (n) { return n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10; }(classes.known.monk.level);
					try {
						var curDie = eval_ish(fields.Damage_Die.replace('d', '*'));
					} catch (e) {
						var curDie = 'x';
					};
					if (isNaN(curDie) || curDie < aMonkDie) {
						fields.Damage_Die = '1d' + aMonkDie;
					};
					if (fields.Mod == 1 || fields.Mod == 2 || What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod") < What(AbilityScores.abbreviations[v.StrDex - 1] + " Mod")) {
						fields.Mod = v.StrDex;
					}
				};
			},
			"I can use either Strength or Dexterity and my Martial Arts damage die in place of the normal damage die for any 'Monk Weapons', which include unarmed strike and 5 + my Wisdom modifier of simple or martial weapons of my choice that I'm proficient with and that don't have the two-handed, heavy, or special property.\n   I can select these weapon using the \"Choose Feature\" button on the 2nd page, or have them count as such by including the words \"Monk Weapon\" in the name of the weapon."
		]
	}
});
// Add the monk weapon options as extrachoices
var origMartialArts = ClassList.monk.features["martial arts"];
origMartialArts.extrachoices = [];
origMartialArts.extraname = "Monk Weapon";
origMartialArts.extraTimes = ["5 + Wisdom Modifier"];
origMartialArts.extrachoicesNotInMenu = GetFeatureChoice("classes", "monk", "martial arts") != "choose monk weapons";
RunFunctionAtEnd(function () {
	for (var weapon in WeaponsList) {
		var aWea = WeaponsList[weapon];
		// skip attacks that are not simple or martial weapons, that have the heavy, two-handed, or special property, are magic weapons, or those that are spells or cantrips
		if (aWea.isMagicWeapon || !(/simple|martial/i).test(aWea.type) || (/heavy|special|((^|[^+-]\b)2|\btwo).?hand(ed)?s?/i).test(aWea.description) || (/spell|cantrip/i).test(aWea.list)) continue;
		origMartialArts.extrachoices.push(aWea.name);
		origMartialArts[aWea.name.toLowerCase()] = {
			name : aWea.name,
			description : "",
			source : aWea.source,
			weaponsAdd : [aWea.name],
			prereqeval : 'testSource("' + weapon + '", WeaponsList["' + weapon + '"], "weapExcl") ? "skip" : isProficientWithWeapon("' + weapon + '", WeaponsList["' + weapon + '"]);'
		}
	}
});
// Because the original Martial Arts feature was moved into a choice, but we want to keep its original "additional", "action", "eval", "removeeval" attributes, move some stuff around
if (origMartialArts["\x1B[original] martial arts"]) {
	["additional", "action", "eval", "removeeval"].forEach(function (n) {
		origMartialArts[n] = origMartialArts["\x1B[original] martial arts"][n];
		delete origMartialArts["\x1B[original] martial arts"][n];
	});
}
// Ki enhancements
AddFeatureChoice(ClassList.monk.features.ki, true, "Ki-Fueled Attack", {
	name : "Ki-Fueled Attack",
	source : ["TCoE", 48],
	minlevel : 3 ,
	description : "\n   If I spend a ki point during my action, I can make an unarmed strike as a bonus action before the end of my turn",
	action : [["bonus action", ""]]
}, "Ki Enhancement");
AddFeatureChoice(ClassList.monk.features.ki, true, "Focused Aim (1-3 ki points)", {
	name : "Focused Aim",
	source : ["TCoE", 49],
	minlevel : 5 ,
	description : " [1-3 ki points]\n   When I miss an attack roll, I can spend 1 to 3 ki points to increase my attack roll by 2 for each of these ki points I spend, potentially turning the miss into a hit"
}, "Ki Enhancement");
AddFeatureChoice(ClassList.monk.features.ki, true, "Quickened Healing (2 ki points)", {
	name : "Quickened Healing",
	source : ["TCoE", 49],
	minlevel : 4 ,
	description : " [2 ki points]\n   As an action, I can regain a number of hit points equal to the roll of my martial arts die plus my proficiency bonus",
	action : [["action", ""]]
}, "Ki Enhancement");

// Paladin alternative class features and enhancements
AddFightingStyle(["paladin"], "Blessed Warrior", {
	name : "Blessed Warrior Fighting Style",
	source : ["TCoE", 52],
	description : desc([
		"I learn two cleric cantrips that count as paladin spells for me and use Cha for spellcasting",
		"Whenever I gain a paladin level, I can swap one of these for another cleric cantrip"
	]),
	spellcastingBonus : {
		name : "Blessed Warrior",
		"class" : "cleric",
		level : [0, 0],
		times : 2
	}
});
// The enhancement option for fighting styles has to be added to each class separately
AddFeatureChoice(ClassList.paladin.features["fighting style"], true, "Martial Versatility", {
	name : "Martial Versatility",
	source : ["TCoE", 53],
	minlevel : 4 ,
	description : "\n   Whenever I gain an Ability Score Improvement from paladin levels, I can swap a fighting style I know for another I'm allowed"
}, "Fighting Style Enhancement");
AddFeatureChoice(ClassList.paladin.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Paladin Spell List",
	source : ["TCoE", 52],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "paladin" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["gentle repose", "prayer of healing", "warding bond", "spirit shroud", "summon celestial"]);
			},
			"This alternative class feature enhancement expands the spells list of the paladin class."
		]
	}
}, "Paladin Spellcasting Enhancement");
AddFeatureChoice(ClassList.paladin.features["subclassfeature3.0-channel divinity"], true, "Harness Divine Power", {
	name : "Channel Divinity: Harness Divine Power",
	source : ["TCoE", 53],
	minlevel : 3 ,
	description : "\n   As a bonus action, I can use my holy symbol and a prayer to regain 1 spell slot. The spell slot recovered can be no higher than half of my proficiency bonus (round up)",
	action : [["bonus action", ""]]
}, "Channel Divinity Enhancement");

// Ranger alternative class features and enhancements

// Make natural explorer into a choice (can't be done by automation because of extrachoices) and add "Deft Explorer" variant option
var origNatExpl = ClassList.ranger.features["natural explorer"];
var origNatExplNm = "\x1B[original] " + origNatExpl.name;
origNatExpl.choices = [origNatExplNm];
origNatExpl.defaultChoice = origNatExplNm.toLowerCase();
origNatExpl[origNatExplNm.toLowerCase()] = {
	name : origNatExpl.name,
	source : origNatExpl.source,
	description : origNatExpl.description,
	additional : origNatExpl.additional,
	extraname : origNatExpl.extraname,
	extrachoices : origNatExpl.extrachoices
};
delete origNatExpl.additional;
origNatExpl.description = '\n   Select ' + origNatExpl.name + ' or a variant using the "Choose Feature" button above';
origNatExpl.name = origNatExpl.name + " or a Variant";
origNatExpl.resetNatExplExtrachoices = function () {
	var extraSel = GetFeatureChoice("classes", "ranger", "natural explorer", true);
	var curExtraName = ClassList.ranger.features["natural explorer"].extraname;
	for (var i = 0; i < extraSel.length; i++) {
		if (extraSel[i] == "travel benefits") ClassList.ranger.features["natural explorer"].extraname = "Ranger 1";
		ClassFeatureOptions(['ranger', 'natural explorer', extraSel[i], 'extra'], "remove");
		if (extraSel[i] == "travel benefits") ClassList.ranger.features["natural explorer"].extraname = curExtraName;
	};
};
// Add the new feature
AddFeatureChoice(origNatExpl, false, "Deft Explorer", {
	name : "Deft Explorer",
	source : ["TCoE", 56],
	minlevel : 1 ,
	description : "I am an unsurpassed explorer and survivor, both in the wilderness and in dealing with others on my travels. I gain the Canny benefit, and I gain additional benefits at 6th and 10th levels in this class",
	features : {
	
	"deft explorer: canny" : {
	name : "Canny",
	source : ["TCoE", 56],
			minlevel : 1,
			description: desc([
				"I learn two languages of my choice and expertise with one of my skills",
			]),
			languageProfs : [2],
			skillstxt : "expertise with one skill of my choice",
},
	"deft explorer: roving" : {
	name : "Roving",
	source : ["TCoE", 56],
			minlevel : 6,
			description : desc([
				"I gain +5 ft walking speed and climbing and swimming speed equal to my walking speed",
				]),
			speed : {
			walk : { spd : "+5", enc : "+5" },
			climb : { spd : "walk", enc : "walk" },
			swim : { spd : "walk", enc : "walk" }
	}
},
"deft explorer : tireless" : {
	name : "Tireless",
	source : ["TCoE", 56],
			minlevel : 10,
			description : desc([
				"Whenever I finish a short or long rest, I reduce my exhaustion level, if any, by 1",
				"As an action a number of times per day, I can give myself temp HP of 1d8 + Wis mod"
			]),
			action : [["action", ""]],
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = Number(What('Proficiency Bonus'));",
			recovery : "long rest"
}}});
// Now set the extraname and extrachoices to the current selection
var origNatExplCurSel = GetFeatureChoice("classes", "ranger", "natural explorer", false);
if (origNatExplCurSel) {
	origNatExpl.extraname = origNatExpl[origNatExplCurSel].extraname ? origNatExpl[origNatExplCurSel].extraname : "";
	origNatExpl.extrachoices = origNatExpl[origNatExplCurSel].extrachoices ? origNatExpl[origNatExplCurSel].extrachoices : "";
	origNatExpl.extraTimes = origNatExpl[origNatExplCurSel].extraTimes ? origNatExpl[origNatExplCurSel].extraTimes : "";
}

// Make favored enemy into a choice (can't be done by automation because of extrachoices) and add "Favored Foe" variant option
var origFavoredEnemy = ClassList.ranger.features["favored enemy"];
var origFavoredEnemyNm = "\x1B[original] " + origFavoredEnemy.name;
origFavoredEnemy.choices = [origFavoredEnemyNm];
origFavoredEnemy.defaultChoice = origFavoredEnemyNm.toLowerCase();
origFavoredEnemy[origFavoredEnemyNm.toLowerCase()] = {
	name : origFavoredEnemy.name,
	source : origFavoredEnemy.source,
	description : origFavoredEnemy.description,
	additional : origFavoredEnemy.additional
};
delete origFavoredEnemy.additional;
origFavoredEnemy.description = '\n   Select ' + origFavoredEnemy.name + ' or a variant using the "Choose Feature" button above';
origFavoredEnemy.name = origFavoredEnemy.name + " or a Variant";
var curFavEnemyChoice = GetFeatureChoice("classes", "ranger", "favored enemy");
origFavoredEnemy.extrachoicesNotInMenu = !!curFavEnemyChoice && curFavEnemyChoice != ClassList.ranger.features["favored enemy"].choices[0].toLowerCase();
AddFeatureChoice(origFavoredEnemy, false, "Favored Foe", {
	name : "Favored Foe",
	source : ["TCoE", 56],
			minlevel : 1,
			description : desc([
				"When you hit a creature with an attack roll, you can call on your mystical bond with nature to mark the target as your favored enemy for 1 minute or until you lose your concentration (as if you were concentrating on a spell).",
				"The first time on each of your turns that you hit the favored enemy and deal damage to it, including when you mark it, you can increase that damage by 1d4.",
				"You can use this feature to mark a favored enemy a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
				"This feature's extra damage increases when you reach certain levels in this class: to 1d6 at 6th level and to 1d8 at 14th level.",
			]),
			usages : "Proficiency Bonus per ",
			usagescalc : "event.value = Number(What('Proficiency Bonus'));",
			recovery : "long rest"
});
// Now some easier alternatives/enhancements
AddFightingStyle(["ranger"], "Druidic Warrior", {
	name : "Druidic Warrior Fighting Style",
	source : ["TCoE", 57],
	description : desc([
		"I learn two druid cantrips that count as ranger spells for me and use Wis for spellcasting",
		"Whenever I gain a ranger level, I can swap one of these for another druid cantrip"
	]),
	spellcastingBonus : {
		name : "Druidic Warrior",
		"class" : "druid",
		level : [0, 0],
		times : 2
}});
// The enhancement option for fighting styles has to be added to each class separately
AddFeatureChoice(ClassList.ranger.features["fighting style"], true, "Martial Versatility", {
	name : "Martial Versatility",
	source : ["TCoE", 56],
	minlevel : 4 ,
	description : desc([
	"Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can replace a fighting style you know with another fighting style available to rangers."
	])
}, "Fighting Style Enhancement");
AddFeatureChoice(ClassList.ranger.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Ranger Spell List",
	source : ["TCoE", 57],
	description : desc([
			"I have extra spells to choose from.",
			"These extra spells are: Greater Restoration, Summon Elemental, Dominate Beast, Summon Fey, Revivify, Meld into Stone, Elemental Weapon, Summon Beast, Magic Weapon, Gust of Wind, Enhance Ability, Aid, Searing Smite and Entangle.",
			]),
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "ranger" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["greater restoration", "summon elemental", "dominate beast", "summon fey", "revivify",	"meld into stone",	"elemental weapon", "summon beast",	"magic weapon",	"gust of wind",	"enhance ability",	"aid",	"searing smite",	"etangle",
			]);
			},
			"This alternative class feature enhancement expands the spells list of the ranger class."
		]
	}
}, "Ranger Spellcasting Enhancement");
AddFeatureChoice(ClassList.ranger.features.spellcasting, true, "Spellcasting Focus", {
	name : "Spellcasting Focus",
			source : ["TCoE", 57],
			minlevel : 2,
			description : desc([
			"I can use a druidic focus as a spellcasting focus for my ranger spells"
			]),
		}, "Ranger Spellcasting Enhancement");
CreateClassFeatureVariant("ranger", "primeval awareness", "Primal Awareness (bonus spells)", {
			name : "Primal Awareness",
			source : ["TCoE", 57],
					minlevel : 3,
					description : desc([
						"I get bonus spells known, which do not count against the number of spells I can know",
						"In addition, I can cast each once per long rest without expending a spell slot",
					]),
					spellcastingBonus : {
						spell : ["speak with animals", "beast sense", "speak with plants", "locate creature", "commune with nature"],
						selection : ["speak with animals", "beast sense", "speak with plants", "locate creature", "commune with nature"],
						times : [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5],
						firstCol : "oncelr",
					}
		});
CreateClassFeatureVariant("ranger", "hide in plain sight", "Nature's Veil", {
	name : "Nature's Veil",
			source : ["TCoE", 57],
			minlevel : 10,
			description : desc([
						  "You draw on the powers of nature to hide yourself from view briefly.",
						  "As a bonus action, you can magically become invisible, along with any equipment you are wearing or carrying, until the start of your next turn.",
						  "You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
						  ]),
			action : [["bonus action", ""]],
			usages : "Proficiency Bonus per ",
			usagescalc : "event.value = Number(What('Proficiency Bonus'));",
			recovery : "long rest",
});
if (ClassSubList["ranger-beast master"]) {
	AddFeatureChoice(ClassSubList["ranger-beast master"].features["subclassfeature3"], true, "Primal Companion", {
		name : "Primal Companion",
		source : ["TCoE", 61],
		description : desc([
			"My ranger's companion can be a primal beast whose lineage stretches back to the beginning",
			"This beast of the air or earth takes the form of a regular animal, but has different abilities",
			"Its hit points total is equal to its Con mod + my Wis mod + 5 times my ranger level",
			"As a bonus action, I can command it to make one attack or take the Hide action",
			"If it dies, I can revive it within 1 hour as an action where I expend a spell slot and touch it",
			"It then returns to life with all its hit points after 1 minute"
		]),
		action : [["bonus action", "Command Beast of the Air/Earth"], ["action", "Revive Beast of the Air/Earth"]]
	}, "Ranger Companion Enhancement");
}
CreatureList["beast of the air"] = {
	name : "Beast of the Air",
	source : ["TCoE", 61],
	size : 4,
	type : "Beast",
	subtype : "",
	alignment : "Neutral",
	ac : 13,
	hp : 6,
	hd : [1, 6],
	speed : "10 ft, fly 60 ft",
	scores : [6, 16, 13, 8, 14, 11],
	saves : ["", 5, 3, "", 4, ""],
	skills : {
		"perception" : 4,
		"stealth" : 5
	},
	senses : "Darkvision 60 ft",
	passivePerception : 14,
	languages : "understands the languages of its master (me)",
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Shred",
		ability : 2,
		damage : [1, 6, "slashing"],
		range : "Melee (5 ft)"
	}],
	features : [{
		name : "Ready Companion",
		description : "As a bonus action, I can command the beast to make its shred attack or to Hide."
	}, {
		name : "Primal Rebirth",
		description : "If the beast has died within the last hour, I can use my action to touch it and expend a spell slot of 1st level or higher. The beast returns to life after 1 minute with all its hit points restored."
	}],
	traits : [{
		name : "Flyby",
		description : "The beast doesn't provoke opportunity attacks when it flies out of an enemy's reach."
	}],
	eval : function(prefix) {
		tDoc.getField(prefix + "Comp.Use.HP.Max").setAction("Calculate", "event.value = (classes.known.ranger ? classes.known.ranger.level : classes.known.rangerua ? classes.known.rangerua.level : 1) * 5 + What('Wis Mod') + What(event.target.name.replace('HP.Max', 'Ability.Con.Mod'));");
		tDoc.getField(prefix + "Comp.Use.HD.Level").setAction("Calculate", "event.value = classes.known.ranger ? classes.known.ranger.level : classes.known.rangerua ? classes.known.rangerua.level : 1;");
	},
	removeeval : function(prefix) {
		if (!prefix) return;
		tDoc.getField(prefix + "Comp.Use.HP.Max").setAction("Calculate", "");
		tDoc.getField(prefix + "Comp.Use.HD.Level").setAction("Calculate", "");
	}
}
CreatureList["beast of the earth"] = {
	name : "Beast of the Earth",
	source : ["TCoE", 61],
	size : 3,
	type : "Beast",
	subtype : "",
	alignment : "Neutral",
	ac : 12,
	hp : 7,
	hd : [1, 8],
	speed : "40 ft, climb or swim 40 ft",
	scores : [14, 14, 15, 8, 14, 11],
	saves : ["", 4, 4, "", 4, ""],
	skills : {
		"perception" : 4,
		"stealth" : 4
	},
	senses : "Darkvision 60 ft",
	passivePerception : 14,
	languages : "understands the languages of its master (me)",
	challengeRating : "1/4",
	proficiencyBonus : 2,
	attacksAction : 1,
	attacks : [{
		name : "Maul",
		ability : 1,
		damage : [1, 6, "slashing"],
		range : "Melee (5 ft)",
		description : "If used after moving 20 ft straight in the same round, see Charge trait"
	}],
	features : [{
		name : "Movement Mode",
		description : "When I bond with the beast, I choose wether it has a climb speed or a swim speed."
	}, {
		name : "Ready Companion",
		description : "As a bonus action, I can command the beast to make its shred attack or to Hide."
	}, {
		name : "Primal Rebirth",
		description : "If the beast has died within the last hour, I can use my action to touch it and expend a spell slot of 1st level or higher. The beast returns to life after 1 minute with all its hit points restored."
	}],
	traits : [{
		name : "Charge",
		description : "If the beast moves at least 20 ft straight toward a target and then hits it with a maul attack on the same turn, the target takes an extra 1d6 slashing damage. If the target is a creature, it must succeed on a Strength saving throw against my spell save DC or be knocked prone."
	}],
	eval : function(prefix) {
		tDoc.getField(prefix + "Comp.Use.HP.Max").setAction("Calculate", "event.value = (classes.known.ranger ? classes.known.ranger.level : classes.known.rangerua ? classes.known.rangerua.level : 1) * 5 + What('Wis Mod') + What(event.target.name.replace('HP.Max', 'Ability.Con.Mod'));");
		tDoc.getField(prefix + "Comp.Use.HD.Level").setAction("Calculate", "event.value = classes.known.ranger ? classes.known.ranger.level : classes.known.rangerua ? classes.known.rangerua.level : 1;");
	},
	removeeval : function(prefix) {
		if (!prefix) return;
		tDoc.getField(prefix + "Comp.Use.HP.Max").setAction("Calculate", "");
		tDoc.getField(prefix + "Comp.Use.HD.Level").setAction("Calculate", "");
	}
}

// Add the Ranger alternative class features also to the Revised Ranger, if it exists
if (ClassList["rangerua"]) {
	// Make natural explorer into a choice (can't be done by automation because of extrachoices) and add "Deft Explorer" variant option
	var origNatExpl = ClassList.rangerua.features["natural explorer"];
	var origNatExplNm = "\x1B[original] " + origNatExpl.name;
	origNatExpl.choices = [origNatExplNm];
	origNatExpl.defaultChoice = origNatExplNm.toLowerCase();
	origNatExpl[origNatExplNm.toLowerCase()] = {
		name : origNatExpl.name,
		source : origNatExpl.source,
		description : origNatExpl.description,
		extraname : origNatExpl.extraname
	};
	origNatExpl.description = '\n   Select ' + origNatExpl.name + ' or a variant using the "Choose Feature" button above';
	origNatExpl.name = origNatExpl.name + " or a Variant";
	origNatExpl.resetNatExplExtrachoices = function () {
		var extraSel = GetFeatureChoice("classes", "rangerua", "natural explorer", true);
		for (var i = 0; i < extraSel.length; i++) {
			ClassFeatureOptions(['rangerua', 'natural explorer', extraSel[i], 'extra'], "remove");
		};
	};
	AddFeatureChoice(origNatExpl, false, "Deft Explorer", {
		name : "Deft Explorer",
		source : ["UA:CFV", 7],
		description : '\n   Use the "Choose Feature" button above to add a deft explorer benefit to the third page',
		eval : function() {
			var natExplFea = ClassList.rangerua.features["natural explorer"];
			natExplFea.resetNatExplExtrachoices();
			natExplFea.extraname = natExplFea["deft explorer"].extraname;
			natExplFea.extrachoices = natExplFea["deft explorer"].extrachoices;
			natExplFea.extraTimes = natExplFea["deft explorer"].extraTimes;
		},
		removeeval : function(lvlA, choiceA) {
			var natExplFea = ClassList.rangerua.features["natural explorer"];
			var newChoice = choiceA[1];
			natExplFea.resetNatExplExtrachoices();
			if (newChoice && natExplFea[newChoice]) {
				natExplFea.extraname = natExplFea[newChoice].extraname ? natExplFea[newChoice].extraname : "";
				natExplFea.extrachoices = natExplFea[newChoice].extrachoices ? natExplFea[newChoice].extrachoices : "";
				natExplFea.extraTimes = natExplFea[newChoice].extraTimes ? natExplFea[newChoice].extraTimes : "";
				if (newChoice.indexOf("\x1B[original]") !== -1) {
					ClassFeatureOptions(['rangerua', 'natural explorer', "travel benefits", 'extra']);
				}
			}
		},
		additional : levels.map(function (n) {
			return n < 6 ? "1 benefit" : (n < 10 ? 2 : 3) + " benefits";
		}),
		extraTimes : levels.map(function (n) {
			return n < 6 ? 1 : n < 10 ? 2 : 3;
		}),
		extraname : "Deft Explorer Benefit",
		extrachoices : ["Canny", "Roving", "Tireless"]
	});
	origNatExpl.canny = {
		name : "Canny",
		source : ["UA:CFV", 7],
		description : desc([
			"I learn two language of my choice, and proficiency and expertise with one skill of my choice",
			"The skill I have to choose from: Animal Handling, Athletics, History, Insight, Investigation,",
			"Medicine, Nature, Perception, Stealth, or Survival"
		]),
		languageProfs : [2],
		skillstxt : "Proficiency and expertise with one from Animal Handling, Athletics, History, Insight, Investigation, Medicine, Nature, Perception, Stealth, or Survival"
	};
	origNatExpl.roving = {
		name : "Roving",
		source : ["UA:CFV", 7],
		description : "\n   I gain +5 ft walking speed and climbing and swimming speed equal to my walking speed",
		speed : {
			walk : { spd : "+5", enc : "+5" },
			climb : { spd : "walk", enc : "walk" },
			swim : { spd : "walk", enc : "walk" }
		}
	};
	origNatExpl.tireless = {
		name : "Tireless",
		source : ["UA:CFV", 7],
		description : desc([
			"Whenever I finish a short or long rest, I reduce my exhaustion level, if any, by 1",
			"As an action a number of times per day, I can give myself temp HP of 1d10 + Wis mod"
		]),
		action : [["action", ""]],
		usages : "Wisdom modifier per ",
		usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
		recovery : "long rest"
	};
	// Now set the extraname and extrachoices to the current selection
	var origNatExplCurSel = GetFeatureChoice("classes", "rangerua", "natural explorer", false);
	if (origNatExplCurSel) {
		origNatExpl.extraname = origNatExpl[origNatExplCurSel].extraname ? origNatExpl[origNatExplCurSel].extraname : "";
		origNatExpl.extrachoices = origNatExpl[origNatExplCurSel].extrachoices ? origNatExpl[origNatExplCurSel].extrachoices : "";
		origNatExpl.extraTimes = origNatExpl[origNatExplCurSel].extraTimes ? origNatExpl[origNatExplCurSel].extraTimes : "";
	}

	// Make favored enemy into a choice (can't be done by automation because of choices) and add "Favored Foe" variant option
	var origFavoredEnemy = ClassList.rangerua.features["favored enemy"];
	// Move some attributes from the main object to the favored enemy choice objects
	var moveOrigFavoredEnemyAttributes = function () {
		var attr = ['additional', 'languageProfs', 'calcChanges'];
		for (var j = 0; j < attr.length; j++) {
			// Move the attribute to each of the choices
			for (var i = 0; i < origFavoredEnemy.choices.length; i++) {
				var aCh = origFavoredEnemy[origFavoredEnemy.choices[i].toLowerCase()];
				aCh[attr[j]] = origFavoredEnemy[attr[j]];
			}
			// Now delete the attributes from the parent object
			delete origFavoredEnemy[attr[j]];
		}
	}();
	// Now add the alternative class feature as another choice
	AddFeatureChoice(origFavoredEnemy, false, "[alternative feature] Favored Foe", {
		name : "Favored Foe",
		source : ["UA:CFV", 7],
		description : desc([
			"I know Hunter's Mark and it doesn't count against the number of spells I can know",
			"I can cast it a number of times without using a spell slot or requiring concentration",
			"I can also use a spell slot to cast it as normal, but then it does require concentration"
		]),
		spellcastingBonus : {
			name : "Favored Foe",
			spells : ["hunter's mark"],
			selection : ["hunter's mark"],
			firstCol : "Sp"
		},
		usages : "Wisdom modifier per ",
		usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
		recovery : "long rest",
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					if (spName == "uaranger" && spType.indexOf("bonus") == -1) {
						if (!spList.notspells) spList.notspells = [];
						spList.notspells = spList.notspells.concat(["hunter's mark"]);
					}
				}
			]
		}
	});

	// The enhancement option for fighting styles has to be added to each class separately
	AddFeatureChoice(ClassList.rangerua.features["fighting style"], true, "Martial Versatility", {
		name : "Martial Versatility",
		source : ["UA:CFV", 12],
		description : "\n   Whenever I gain a ranger level, I can swap a fighting style I know for another I'm allowed"
	}, "Fighting Style Enhancement");
	AddFeatureChoice(ClassList.rangerua.features.spellcasting, true, "Expanded Spell List", {
		name : "Expanded Ranger Spell List",
		source : ["UA:CFV", 7],
		description : "",
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					// Stop this is not the class' spell list or if this is for a bonus spell entry
					if (spName !== "rangerua" || spType.indexOf("bonus") !== -1) return;
					spList.extraspells = spList.extraspells.concat(["aid", "entangle", "searing smite", "gust of wind", "magic weapon", "enhance ability", "warding bond", "blinding smite", "meld into stone", "revivify", "tongues", "death ward", "dominate beast", "awaken", "greater restoration"]);
				},
				"This alternative class feature enhancement expands the spells list of the ranger class."
			]
		}
	}, "Ranger Spellcasting Enhancement");
	AddFeatureChoice(ClassList.rangerua.features.spellcasting, true, "Spell Versatility", {
		name : "Spell Versatility",
		source : ["UA:CFV", 8],
		description : "\n   When I finish a long rest, I can replace a ranger spell I know with another of the same level"
	}, "Ranger Spellcasting Enhancement");
	AddFeatureChoice(ClassList.rangerua.features.spellcasting, true, "Spellcasting Focus", {
		name : "Spellcasting Focus",
		source : ["UA:CFV", 8],
		description : "\n   I can use a druidic focus as a spellcasting focus for my ranger spells"
	}, "Ranger Spellcasting Enhancement");
	CreateClassFeatureVariant("rangerua", "primeval awareness", "Primal Awareness (bonus spells)", {
		name : "Primal Awareness",
		source : ["UA:CFV", 8],
		description : desc([
			"I get bonus spells known, which do not count against the number of spells I can know",
			"In addition, I can cast each once per long rest without expending a spell slot"
		]),
		calcChanges : {
			spellAdd : [
				function (spellKey, spellObj, spName) {
					var bonusSpells = ["detect magic", "speak with animals", "beast sense", "locate animals or plants", "speak with plants", "locate creature", "commune with nature"];
					if (spName == "rangerua" && bonusSpells.indexOf(spellKey) != -1) {
						spellObj.firstCol = "oncelr";
						return true;
					};
				},
				"I can cast these spells each once per long rest without expending a spell slot, but also as normal by expending a spell slot."
			],
			spellList : [
				function(spList, spName, spType) {
					// Remove the bonus spells from the normally selectable list
					if (spName == "rangerua") {
						if (!spList.notspells) spList.notspells = [];
						spList.notspells = spList.notspells.concat(["detect magic", "speak with animals", "beast sense", "locate animals or plants", "speak with plants", "locate creature", "commune with nature"]);
					}
				},
				"I know the following spells, without them counting towards the maximum number of spells I can know: Detect Magic, Speak with Animals, Beast Sense, Locate Animals or Plants, Speak with Plants, Locate Creature, and Commune with Nature."
			]
		},
		changeeval : function() {
			// as another subclass might override the 'extra' attribute in the CurrentSpells object, add it through an eval
			if (!CurrentSpells.rangerua) return;
			var bonusSpells = ["detect magic", "speak with animals", "beast sense", "locate animals or plants", "speak with plants", "locate creature", "commune with nature"];
			if (!CurrentSpells.rangerua.extra) CurrentSpells.rangerua.extra = [];
			if (CurrentSpells.rangerua.extra.toString().indexOf(bonusSpells.toString()) == -1) {
				var newExtra = [];
				for (var i = 0; i < CurrentSpells.rangerua.extra.length; i++) {
					var anExtra = CurrentSpells.rangerua.extra[i];
					if (anExtra && anExtra !== "AddToKnown" && bonusSpells.indexOf(anExtra) == -1) newExtra.push(anExtra);
				}
				CurrentSpells.rangerua.extra = newExtra.concat(bonusSpells);
				CurrentSpells.rangerua.extra[100] = "AddToKnown";
			}
		},
		removeeval : function() {
			// remove the extra spells
			if (!CurrentSpells.rangerua || !CurrentSpells.rangerua.extra) return;
			var bonusSpells = ["detect magic", "speak with animals", "beast sense", "locate animals or plants", "speak with plants", "locate creature", "commune with nature"];
			if (CurrentSpells.rangerua.extra.toString().indexOf(bonusSpells.toString()) !== -1) {
				var newExtra = CurrentSpells.rangerua.extra.join("##").replace(bonusSpells.join("##"), "").replace("AddToKnown", "").replace(/#+$/, '');
				CurrentSpells.rangerua.extra = newExtra.split("##");
				CurrentSpells.rangerua.extra[100] = "AddToKnown";
			}
		}
	});
	CreateClassFeatureVariant("rangerua", "hide in plain sight", "Fade Away", {
		name : "Fade Away",
		source : ["UA:CFV", 8],
		description : desc([
			"As a bonus action, I can become invisible along with any equipment I'm wearing/carrying",
			"This invisibility lasts until the start of my next turn"
		]),
		action : [["bonus action", ""]],
		usages : 1,
		recovery : "short rest"
	});
}

// Rogue alternative class feature enhancement
AddFeatureChoice(ClassList.rogue.features["cunning action"], true, "Steady Aim", {
	name : "Steady Aim",
	source : ["TCoE", 62],
	description : desc([
		"I can also use my cunning action bonus action to carefully aim my next attack",
		"If I don't move in my turn, I give myself adv. on my next attack in the current turn",
		"After I use cunning action to aim, my speed is 0 until the end of the current turn"
	])
}, "Cunning Action Enhancement");

// Sorcerer alternative class features and enhancements
AddFeatureChoice(ClassList.sorcerer.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Sorcerer Spell List",
	source : ["TCoE", 65],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "sorcerer" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["booming blade", "green-flame blade", "lightning lure", "mind sliver", "sword burst", "grease", "tasha's caustic brew", "flame blade", "flaming sphere", "magic weapon", "tasha's mind whip", "intellect fortress", "vampiric touch", "fire shield", "flesh to stone", "otiluke's freezing sphere", "tasha's otherworldly guise", "dream of the blue veil", "demiplane", "blade of disaster"]);
			},
			"This alternative class feature enhancement expands the spells list of the sorcerer class."
		]
	}
}, "Sorcerer Spellcasting Enhancement");
AddFeatureChoice(ClassList.sorcerer.features["metamagic"], true, "Spell Versatility", {
	name : "Sorcerous Versatility",
	source : ["TCoE", 66],
	minlevel : 4,
	description : "\n   When I gain an Ability Score Improvement from this class, I can do one of the following: I can replace one of the options I chose for the Metamagic feature with a different Metamagic option available to me OR I can replace one cantrip I learned from this class's spellcasting feature with another cantrip from the sorcerer list"
}, "Sorcerer Spellcasting Enhancement");
// Font of Magic options
AddFeatureChoice(ClassList.sorcerer.features["font of magic"], true, "Magical Guidance", {
	name : "Magical Guidance",
	source : ["TCoE", 66],
	minlevel : 5,
	description : " [1 sorcery points]\n   When I make an ability check on my turn, I can spend 1 sorcery point point to reroll the d20, and I must use the new roll"
}, "Font of Magic Enhancement");
// Metamagic options
AddFeatureChoice(ClassList.sorcerer.features["metamagic"], true, "Transmuted Spell", {
	name : "Transmuted Spell",
	source : ["TCoE", 66],
	description : " [1 sorcery point]" + desc([
		"I can change the damage type of a spell to acid, cold, fire, lightning, or thunder instead",
		"I can only do this if the spell originally deals one of these damage types"
	])
});
AddFeatureChoice(ClassList.sorcerer.features["metamagic"], true, "Seeking Spell", {
	name : "Seeking Spell",
	source : ["TCoE", 66],
	description : " [2 sorcery points]" + desc([
		"If I make an attack roll for a spell and miss, I can use this to reroll the d20; I must use the new roll",
		"I can use seeking spell even if I already used another metamagic option for the spell"
	])
});

// Warlock alternative class features and enhancements
AddFeatureChoice(ClassList.warlock.features["pact magic"], true, "Spell Versatility", {
	name : "Eldritch Versatility",
	source : ["TCoE", 70],
	minlevel : 4,
	description : "\n   Whenever I gain an Ability Score Improvement from Warlock levels; I can exchange a Warlock cantrip for another available to me, I can replace my Pact Boon for another available option; or, if I am 12th level or higher, I can replace one mystic arcanum spell with another spell of the same level from the warlock list"
}, "Pact Magic Enhancement");
AddFeatureChoice(ClassList.warlock.features["pact magic"], true, "Expanded Spell List", {
	name : "Expanded Warlock Spell List",
	source : ["TCoE", 70],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "warlock" || (spType.indexOf("bonus") !== -1 && (!spList["class"] || spList["class"] !== "warlock"))) return;
				spList.extraspells = spList.extraspells.concat(["booming blade", "green-flame blade", "lightning lure", "mind sliver", "sword burst", "intellect fortress", "spirit shroud", "summon fey", "summon shadowspawn", "summon undead", "summon aberration", "mislead", "planar binding", "teleportation circle", "summon fiend", "tasha's otherworldly guise", "dream of the blue veil", "blade of disaster", "gate", "weird"]);
			},
			"This alternative class feature enhancement expands the spells list of the warlock class."
		]
	}
}, "Pact Magic Enhancement");
// New Eldritch Invocations
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Bond of the Talisman (prereq: level 12 warlock, Pact of the Talisman)", {
	name : "Bond of the Talisman",
	source : ["TCoE", 70],
	description : desc([
		"As an action, I can teleport to the unoccupied space closest to the wearer of my talisman",
		"The talisman's wearer can do the same to teleport to me; Only works if both on same plane"
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 12 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the talisman';
	},
	action : [["action", ""]],
	usages : "Proficiency Bonus per ",
	usagescalc : "event.value = Number(What('Proficiency Bonus'));",
	recovery : "long rest"
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Eldritch Mind", {
	name : "Eldritch Mind",
	source : ["TCoE", 71],
	description : "\n   I have advantage on my Constitution saving throws to maintain concentration on a spell",
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'invocations') == 'pact of the tome';
	},
	savetxt : { text : "Adv. on Con (Concentration) saves" }
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Far Scribe (prereq: level 5 warlock, Pact of the Tome)", {
	name : "Far Scribe",
	source : ["TCoE", 71],
	description : desc([
		"My book of shadows has a new page; As an action, a creature can write its name on it",
		"This page can hold my Proficiency Bonus in creature names; I can remove one as an action",
		"I can cast Sending without a spell slot or material components, targeting one on the page",
		"Instead of saying the message, I write it on the page and any reply appears there as well",
		"This writing disappears after 1 minute; The target still hears the message in their mind"
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 5 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the tome';
	},
	action : [["action", " (erase name)"]],
	spellcastingBonus : {
		name : "Far Scribe",
		spells : ["sending"],
		selection : ["sending"],
		firstCol : "atwill"
	},
	spellChanges : {
		"sending" : {
			components : "V,S",
			compMaterial : "",
			description : "Send 25 word message to creature named in book of shadows; it recognizes me and can respond 25 words",
			changes : "By using Far Scribe, I can cast Sending without using a spell slot or material components, but only to target one of the creatures that wrote their name in my book of shadows. Instead of speaking the message, I write it in my book and any response appears there as well, lasting for 1 minute. The target still hears the message in their mind."
		}
	}
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Gift of the Protectors (prereq: level 9 warlock, Pact of the Tome)", {
	name : "Gift of the Protectors",
	source : ["TCoE", 71],
	description : desc([
		"My book of shadows has a new page; As an action, a creature can write its name on it",
		"This page can hold my Proficiency Bonus in creature names; I can remove one as an action",
		"If a creature whose name is on the page drops to 0 HP, it magically drops to 1 HP instead",
		"This doesn't work if the creature would be killed outright"
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 9 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the tome';
	},
	action : [["action", " (erase name)"]],
	usages : 1,
	recovery : "long rest"
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Investment of the Chain Master (prereq: Pact of the Chain)", {
	name : "Investment of the Chain Master",
	source : ["TCoE", 71],
	description : desc([
		"When I cast Find Familiar, the summoned create has additional benefits:",
		"\u2022 It gains a flying or swimming speed of 40 ft (my choice at casting)",
		"\u2022 AS a bonus action, I can command the familiar to take the Attack action",
		"\u2022 Its weapon attacks are considered magical for overcoming immunities and resistances",
		"\u2022 If it forces a creature to make a saving throw, it uses my spell save DC",
		"\u2022 When the familiar takes damage, I can use my reaction to grant it resistance against that damage",
		"Note that the automation will only add this to current familiars and on a level change"
	]),
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the chain';
	},
	changeeval : function(lvlA) {
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		if (!AScompA) return;
		var aStr = "My Investment of the Chain Master eldritch invocation grants my familiar the following:"+
		"\n\u2022 The familiar gains a flying or swimming speed of 40 ft (my choice at casting)"+
		"\n\u2022 The familiar no longer needs to breathe"+
		"\n\u2022 Its weapon attacks are considered magical for overcoming immunities and resistances"+
		"\n\u2022 If the familiar forces a creature to make a saving throw, it uses my spell save DC";
		var aFnc = !lvlA[1] ? RemoveString : AddString;
		for (var a = 1; a < AScompA.length; a++) {
			if (What(AScompA[a] + 'Comp.Type') == "Familiar") {
				aFnc(AScompA[a] + "Cnote.Left", aStr, true);
			}
		}
	},
	action : [["bonus action", ""]]
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Protection of the Talisman (prereq: level 7 warlock, Pact of the Talisman)", {
	name : "Protection of the Talisman",
	source : ["TCoE", 71],
	description : "\n   The wearer of my talisman adds 1d4 to saving throw rolls in which they lack proficiency. This can be used a number of times equal to my proficiency bonus, and all expended uses are restored when I finish a long rest",
	prereqeval : function(v) {
		return classes.known.warlock.level >= 9 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the talisman';
	},
	savetxt : { text : ["+1d4 to nonproficient saves"] },
	usages : "Proficiency Bonus per ",
	usagescalc : "event.value = Number(What('Proficiency Bonus'));",
	recovery : "long rest"
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Rebuke of the Talisman (prereq: Pact of the Talisman)", {
	name : "Rebuke of the Talisman",
	source : ["TCoE", 71],
	description : desc([
		"As a reaction when the wearer of my talisman is hit, I deal damage and push the attacker",
		"To be able to do this, I have to see the attacker and it has to be within 30 ft of me",
		"I deal my Proficiency Bonus in psychic damage and push it 10 ft away from the talisman's wearer"
	]),
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the talisman';
	},
	action : [["reaction", ""]]
});
// Pact Boon option
AddFeatureChoice(ClassList.warlock.features["pact boon"], false, "Pact of the Talisman", {
	name : "Pact of the Talisman",
	source : ["TCoE", 70],
	description : desc([
		"The wearer of this amulet adds 1d4 to failed ability checks, potentially turning a failed roll into a success; I can do this a number of times equal to my proficiency bonus and all expended uses are regained on a long rest",
		"I can give the talisman to others to use; The talisman turns to ash when I die",
		"If I lose my talisman, I can perform an 1-hour ceremony to gain a replacement",
		"This ceremony destroys the previous amulet and can be done during a short or long rest"
	]),
	usages : "Proficiency Bonus per ",
	usagescalc : "event.value = Number(What('Proficiency Bonus'));",
	recovery : "long rest"
});

// Wizard alternative class features and enhancements
AddFeatureChoice(ClassList.wizard.features.spellcasting, true, "Cantrip Formulas", {
	name : "Cantrip Formulas",
	source : ["TCoE", 76],
	minlevel : 3,
	description : "\n	I have scripted a set of arcane formulas in my spellbook that I can use to formulate a cantrip in my mind. Whenever I finish a long rest and consult those formulas in my spellbook, I can replace on wizard cantrip I know with another cantrip from the wizard spell list"
}, "Wizard Spellcasting Enhancement");
AddFeatureChoice(ClassList.wizard.features.spellcasting, true, "Expanded Spell List", {
	name : "Additional Wizard Spells",
	source : ["TCoE", 75],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "wizard" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["booming blade", "green-flame blade", "lightning lure", "mind sliver", "sword burst", "tasha's caustic brew", "augury", "enhance ability", "tasha's mind whip", "intellect fortress", "speak with dead", "spirit shroud", "summon fey", "summon shadow-spawn", "summon undead", "divination", "summon aberration", "summon construct", "summon elemental", "summon fiend", "tasha's otherworldly guise", "dream of the blue well", "blade of disaster"]);
			},
			"This alternative class feature enhancement expands the spells list of the wizard class."
		]
	}
}, "Wizard Spellcasting Enhancement");
