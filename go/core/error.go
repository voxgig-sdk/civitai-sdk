package core

type CivitaiError struct {
	IsCivitaiError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCivitaiError(code string, msg string, ctx *Context) *CivitaiError {
	return &CivitaiError{
		IsCivitaiError: true,
		Sdk:              "Civitai",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CivitaiError) Error() string {
	return e.Msg
}
