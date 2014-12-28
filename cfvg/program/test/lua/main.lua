-- Gamestate data
Gamestate = require "hump/gamestate"
local menu = {}
local game = {}
local pause = {}

-- Timer data
Timer = require "hump/timer"
menuTimer = Timer.new()
gameTimer = Timer.new()

-- Class data
Class = require 'hump/class'

Creature = Class{
	init = function(self, pos, img)
		self.pos = pos or {x=100,y=100}
		self.img = img or love.graphics.newImage("hamster.png")
	end
}
function Creature:stats()
	return string.format("x: %.02f", self.pos.x)
end

Voodoo = Class{__includes = Creature, -- {A,B} for multiple inheritances
	init = function(self, r, pos, img)
		pos = pos or {x=600,y=600}
        Creature.init(self, pos, img) -- call super constructor
        self.r = r
    end
}

-- Signals data
Signals = require "hump/signal"
gamesignal = Signals.new()

-- Camera data
Camera = require "hump/camera"
gamecam = Camera()

function love.load()
	love.graphics.setBackgroundColor(11, 88, 123)
    Gamestate.registerEvents()
    Gamestate.switch(menu)
end

function menu:init()
	image = love.graphics.newImage("hamster.png")
	abc = 0
	yes = 7
end

function menu:draw()
	love.graphics.rectangle("fill",5,5,500,500)
    love.graphics.print("Press Enter to continue:", 10, 10)
	love.graphics.draw(image,50,50)
end

function menu:keyreleased(key, code)
	if key == 'return' then	
		Gamestate.switch(game)
	end
	if Gamestate.current() == menu and key == 'p' then	
		Gamestate.push(pause)
	end
	if key == 't' then
        menuTimer:add(1, function() yes = math.random(1,10) end)
    end
	if key == 'r' then
		menuTimer:clear()
	end
end

function menu:update(dt)
	abc = abc + dt
	menuTimer:update(dt)
end

function menu:draw()
	love.graphics.setColor(255,255,255)
	love.graphics.rectangle("fill",5,5,500,500)
	love.graphics.setColor(0,0,0)
    love.graphics.print("Press Enter to continue: ", 10, 10)
    love.graphics.print(abc, 10, 20)
	love.graphics.print(yes, 10, 50)
	love.graphics.setColor(255,255,255)
	love.graphics.draw(image,50,50)
	love.graphics.rectangle('fill', -50,400, 100,100)
end

function pause:enter(from)
    self.from = from -- record previous state
end

function pause:draw()
    local W, H = love.graphics.getWidth(), love.graphics.getHeight()
    self.from:draw()	--'from' is the previous state [pause:enter()]
	
    love.graphics.setColor(0,0,0, 100)
    love.graphics.rectangle('fill', 0,0, W,H)
    love.graphics.setColor(255,255,255)
    love.graphics.printf('PAUSE', 0, H/2, W, 'center') -- overlay with pause message
end

function pause:keyreleased(key)
    if key == 'p' then
        Gamestate.pop() -- return to previous state
    end
    if key == 'c' then
        abc = 0
    end
end

function game:init()
	ham = Creature()
	heh = Voodoo(10)
	colour = {0, 0, 0}

	stuff = {'linear', 'quad', 'cubic', 'quart', 'quint', 'sine', 'expo', 'circ', 'back', 'bounce', 'elastic'}
	c = 0
	animate(100,600,100,600,stuff)

	gamesignal:register('wow', function(x) colour = {200, x, 200} end)
end

function animate(startx,targetx,starty,targety,modes)
	circle = {x=startx, y=starty}
	if c >= #modes then c = 1 else c = c + 1 end
	gameTimer:tween(3, circle, {x=targetx, y=targety}, modes[c], function() gameTimer:add(.5, animate(100,600,100,600,stuff)) end)
end

function game:keyreleased(key)
	if Gamestate.current() == game and key == 'p' then	
		Gamestate.push(pause)
	end
	if key == 't' then
		gamesignal:emit('wow', checkm())
		gamecam:rotate(math.pi/8)
	end
end

function game:update(dt)
	gameTimer:update(dt)
end

function checkm()
	local x = love.mouse.getX()
	if x > 0 and x < 100 then return 50
	elseif x > 100 and x < 200 then return 150
	else return 200 end
end

function game:draw()
	love.graphics.setColor(0,0,0)
    love.graphics.print(colour[1].." "..colour[2].." "..colour[3].." You have been continued "..stuff[c], 50, 50)
	

	gamecam:attach()
	love.graphics.setColor(255,255,255)
	love.graphics.setBackgroundColor(colour)
	love.graphics.draw(ham.img,ham.pos.x,ham.pos.y)
	love.graphics.draw(heh.img,heh.pos.x,heh.pos.y,heh.r)
    love.graphics.circle('fill', circle.x, circle.y,50)
	gamecam:detach()
end
