package pokemon

type Pokemon struct {
	NationalDexNo  string
	Name           string
	Gender         []string
	Generation     string
	Type           []string
	Classification string
	BaseStats      Stats
	Height         Height
	Weight         Weight
}

type Stats struct {
	HP        int
	Attack    int
	Defense   int
	SpAttack  int
	SpDefense int
	Speed     int
}

type Height struct {
	Meters float32 // represented as (meters).(centimeters)
	Feet   float32 // represented as (feet).(inches)
}

type Weight struct {
	Kilograms float32
	Pounds    float32
}
