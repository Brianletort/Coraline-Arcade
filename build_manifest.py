#!/usr/bin/env python3
"""Merge new games into ~/arcade/web/site/games.json (on ubuntu)."""

import json, sys

PATH = "/home/bletort/arcade/web/site/games.json"


def load(path):
    with open(path) as f:
        return json.load(f)


def save(d, path):
    with open(path, "w") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
        f.write("\n")


def sec(d, sid):
    for s in d["sections"]:
        if s["id"] == sid:
            return s
    raise KeyError(sid)


def add_items_to(d, sid, items):
    s = sec(d, sid)
    existing = {i["name"] for i in s["items"]}
    added = 0
    for it in items:
        if it["name"] in existing:
            continue
        s["items"].append(it)
        added += 1
    return added


def main():
    d = load(PATH)

    # ---- new lrusso single-file games -> Fun & Novelty / Games & Quests ----
    novelty = [
        {
            "name": "3D Pinball Space Cadet",
            "url": "games/lrusso/3DPinballSpaceCadet/",
            "icon": "🪩",
            "desc": "The classic Windows pinball table, rebuilt for the browser",
        },
        {
            "name": "Virtual Pet",
            "url": "games/lrusso/VirtualPet/",
            "icon": "🐾",
            "desc": "Take care of your very own pet",
        },
        {
            "name": "Aquarium",
            "url": "games/lrusso/Aquarium/",
            "icon": "🐠",
            "desc": "A soothing virtual fish tank",
        },
        {
            "name": "Mini Piano",
            "url": "games/lrusso/MiniPiano/",
            "icon": "🎹",
            "desc": "Play tunes on a touch piano",
        },
    ]
    quests = [
        {
            "name": "Endless Runner",
            "url": "games/lrusso/EndlessRunnerPhaser/",
            "icon": "🏃",
            "desc": "Jump and run forever",
        },
        {
            "name": "Classroom",
            "url": "games/lrusso/ClassroomPhaser/",
            "icon": "📚",
            "desc": "A school-day playground",
        },
    ]

    a1 = add_items_to(d, "odd", novelty)
    a2 = add_items_to(d, "adventure", quests)
    print(f"lrusso added: novelty={a1} quests={a2}")

    # ---- attogram keepers (static, English) ----
    classics = [
        {
            "name": "2048 Classic",
            "url": "games/2048-lite/",
            "icon": "🔢",
            "desc": "The original slide-and-merge",
        },
        {
            "name": "Hextris Classic",
            "url": "games/hextris-lite/",
            "icon": "🔶",
            "desc": "Hexagonal falling blocks",
        },
        {
            "name": "Pac-Man Classic",
            "url": "games/pacman-lite/",
            "icon": "👻",
            "desc": "Chomp the maze, classic style",
        },
        {
            "name": "The Pond",
            "url": "games/pond-lite/",
            "icon": "🐟",
            "desc": "A little pond ecosystem",
        },
    ]
    odd = [
        {
            "name": "Particle Clicker",
            "url": "games/att/particle-clicker/",
            "icon": "⚛️",
            "desc": "Build your own physics lab — CERN in your browser",
        },
        {
            "name": "NS-Shaft",
            "url": "games/att/NS-SHAFT/",
            "icon": "🏗️",
            "desc": "A tiny elevator-riding puzzler",
        },
    ]
    a3 = add_items_to(d, "classics", classics)
    a4 = add_items_to(d, "odd", odd)
    print(f"attogram added: classics={a3} odd={a4}")

    # ---- curated mini-pack games (visual / language-light) -> new section ----
    # (file, name, icon, desc)
    MINI = [
        ("air-hockey", "Air Hockey", "🏒", "Swipe and score — 1v1 puck action"),
        ("fruit-slice", "Fruit Slice", "🍉", "Slice the fruit, dodge the bombs"),
        ("sky-hop", "Sky Hop", "☁️", "Hop from cloud to cloud"),
        ("snake-game", "Neon Snake", "🪱", "Grow the glowing snake"),
        ("tank-arena", "Tank Arena", "🛡️", "Steel tanks battling it out"),
        ("ball-arena", "Ball Arena", "🟡", "Bounce, reflect, survive"),
        ("flappy-glider", "Flappy Glider", "🐦", "Glide through the gaps"),
        ("stack-tower", "Stack Tower", "🗼", "Stack the blocks straight"),
        ("penalty-rush", "Penalty Rush", "⚽", "Score goals, save shots"),
        ("pocket-golf", "Pocket Golf", "⛳", "Mini-golf putt challenge"),
        ("moon-lander", "Moon Lander", "🌙", "Land softly on the moon"),
        ("orbital-pinball", "Orbital Pinball", "🪐", "Space-themed pinball"),
        ("drift-racer", "Drift Racer", "🏎️", "Drift around the track"),
        ("slingstorm", "Sling Storm", "🪂", "Sling through the storm"),
        ("spud-arena", "Spud Arena", "🥔", "Potato battles in the arena"),
        ("maze-chase", "Maze Chase", "🌀", "Chase through the maze"),
        ("monster-horde", "Monster Horde", "👾", "Survive the monster waves"),
        ("monster-tamer", "Monster Tamer", "🐉", "Catch and collect monsters"),
        ("sokoban-quest", "Sokoban", "📦", "Push the crates home"),
        ("mosaic-jigsaw", "Mosaic Jigsaw", "🧩", "Piece the mosaic together"),
        ("merge-orbit", "Merge Orbit", "🪐", "Merge planets in orbit"),
        ("prism-breaker", "Prism Breaker", "🔮", "Break the light prisms"),
        ("bomb-grid", "Bomb Grid", "💣", "Clear the minefield"),
        ("dojo-duel", "Dojo Duel", "🥋", "Martial arts showdown"),
        ("neon-2048", "Neon 2048", "🔢", "Falling neon tiles"),
        ("dice-delver", "Dice Delver", "🎲", "Roll your way through the dungeon"),
        ("pocket-farm", "Pocket Farm", "🌾", "Grow your little farm"),
        ("blackjack-table", "Blackjack", "🃏", "Play blackjack vs the house"),
        ("mahjong-link", "Mahjong Link", "🀄", "Match the mahjong tiles"),
        ("connect-arena", "Connect Arena", "🔗", "Four in a row"),
        ("mole-market", "Mole Market", "🕳️", "Whack the moles"),
        ("lantern-memory", "Lantern Memory", "🏮", "Match the lanterns"),
        ("word-grid", "Word Grid", "🔤", "Find words in the grid"),
    ]
    mini_items = []
    for fn, name, icon, desc in MINI:
        mini_items.append(
            {
                "name": name,
                "url": f"games/mini/{fn}.html",
                "icon": icon,
                "desc": desc,
            }
        )
    new_sec = {
        "id": "more",
        "name": "🌈 More Games",
        "description": "More quick games for the iPad — all touch-friendly",
        "style": "default",
        "items": mini_items,
    }
    if not any(s["id"] == "more" for s in d["sections"]):
        d["sections"].append(new_sec)
        print(f"new section 'more' added with {len(mini_items)} games")
    else:
        sec(d, "more")["items"] = mini_items
        print(f"section 'more' replaced with {len(mini_items)} games")

    save(d, PATH)
    total = sum(len(s["items"]) for s in d["sections"])
    print(f"TOTAL games now: {total}")


if __name__ == "__main__":
    main()
